import { pool } from "../../config/db"

const addVehicles = async (payload: Record<string, unknown>) => {

    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;

    const result = await pool.query(`INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES ($1, $2, $3, $4, $5) RETURNING * `, [vehicle_name, type, registration_number, daily_rent_price, availability_status])

    return result;
}


const getVehicles = async () => {
    const result = await pool.query(`SELECT * FROM vehicles`);

    return result;
}

const getSpecificVehicles = async (vehicleId: string) => {

    const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [vehicleId]);

    return result;
}

const updateVehicles = async (payload: Record<string, unknown>, vehicleId: string) => {

    const { vehicle_name = null, type = null, registration_number = null, daily_rent_price = null, availability_status = null } = payload;

    const result = await pool.query(`UPDATE  vehicles SET vehicle_name = COALESCE($1, vehicle_name), 
    type = COALESCE($2, type), 
    registration_number = COALESCE($3, registration_number), daily_rent_price = COALESCE($4, daily_rent_price), availability_status = COALESCE($5, availability_status)  WHERE id = $6 RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status, vehicleId]);


    if(!result.rowCount){
        throw new Error('No vehicles was found for update, Please give valid Credentials')
    }

    return result;
}


const deleteVehicle = async (vehicleId: string) => {

    const vehicleResult = await pool.query(
        `SELECT availability_status FROM vehicles WHERE id = $1`,
        [vehicleId]
    );

    if (vehicleResult.rowCount === 0) {
        throw new Error("Vehicle does not exist or invalid ID");
    }

    const availabilityStatus = vehicleResult.rows[0].availability_status;

    if (availabilityStatus === 'booked') {
        throw new Error("Cannot delete the vehicle because it is booked");
    }

    const result = await pool.query(
        `DELETE FROM vehicles WHERE id = $1 RETURNING *`,
        [vehicleId]
    );

    return result;
};

export const vehicleServices = {
    addVehicles,
    getVehicles,
    getSpecificVehicles,
    updateVehicles,
    deleteVehicle
}