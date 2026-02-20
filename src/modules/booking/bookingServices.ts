import { Request } from "express";
import { pool } from "../../config/db"
import { JwtPayload } from "jsonwebtoken";

const addBooking = async (payload: Record<string, unknown>) => {

    const client = await pool.connect()

    try {

        await client.query('BEGIN');

        const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

        // getting the vehicle data form db
        const vehicleData = await client.query(`SELECT daily_rent_price, availability_status FROM vehicles WHERE id=$1 FOR UPDATE`, [vehicle_id]);


        if (!vehicleData.rows.length) {
            throw new Error('no vehicles found ')
        }

        if (vehicleData.rows[0].availability_status !== 'available') {
            throw new Error('vehicle is not available now')
        }

        const dailyPrice = Number(vehicleData.rows[0].daily_rent_price);

        const start_date = new Date(rent_start_date as string);
        const end_date = new Date(rent_end_date as string);

        const totalRentingTime = end_date.getTime() - start_date.getTime();

        const totalRentDays = Math.ceil(totalRentingTime / (1000 * 60 * 60 * 24));

        if (totalRentDays <= 0) {
            throw new Error('Invalid Booking Duration')
        }

        const totalPrice = dailyPrice * totalRentDays;




        // db query
        const result = await client.query(`INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [customer_id, vehicle_id, rent_start_date, rent_end_date, totalPrice, "active"]);


        const bookingId = result.rows[0].id;


        // Update vehicle status query
        const statusUpdate = await client.query(`UPDATE vehicles SET  availability_status = 'booked' WHERE id = $1`, [vehicle_id]);

        const fullBookings = await client.query(`SELECT b.id, b.customer_id, b.vehicle_id, b.rent_start_date, b.rent_end_date, b.total_price, b.status, v.vehicle_name, v.daily_rent_price FROM bookings b JOIN vehicles v ON b.vehicle_id = v.id WHERE b.id = $1`, [bookingId])

        await client.query("COMMIT");

        return fullBookings;


    } catch (err) {
        await client.query("ROLLBACK");
        throw err;

    } finally {
        client.release();
    }

}

const getBooking = async (user: JwtPayload) => {

    if (user.role === "admin") {
        const result = await pool.query(`SELECT * FROM bookings`);
        return result;
    }

    const result = await pool.query(`SELECT * FROM bookings WHERE customer_id=$1`, [user.id]);

    return result;

}


const updateBookingStatus = async (status: string, user: JwtPayload, bookingId: string) => {

    const client = await pool.connect();

    try {
        await client.query("BEGIN")

        const bookingRes = await client.query(`SELECT * FROM bookings WHERE id = $1`, [bookingId]);

        if (bookingRes.rows.length === 0) {
            throw new Error("Booking not found");
        }

        const booking = bookingRes.rows[0];

        if (user.role === 'customer') {

            if (status !== 'cancelled') {
                throw new Error('customer can only cancel booking');
            }

            if (booking.customer_id !== user.id) {
                throw new Error('You can only update your own booking');
            }

        }



        if (user.role === 'admin') {
            if (status !== 'returned') {
                throw new Error("admin can only mark booking as returned")
            }
        }

        const updateBooking = await client.query(`UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *`, [status, bookingId]);

        let vehicleAvailabilityStatus = null;

        if (status === 'returned' || status === 'cancelled') {
            const updateVehicle = await client.query(`UPDATE vehicles SET availability_status = 'available' WHERE id = $1 RETURNING availability_status`, [booking.vehicle_id]);

            vehicleAvailabilityStatus = updateVehicle.rows[0];
        }



        await client.query('COMMIT');

        return {
            booking: updateBooking.rows[0],
            vehicle: vehicleAvailabilityStatus
        };

    } catch (error) {
        await client.query('ROLLBACK');
        throw error;

    } finally {
        client.release();
    }

}

export const bookingServices = {
    addBooking,
    getBooking,
    updateBookingStatus,
}