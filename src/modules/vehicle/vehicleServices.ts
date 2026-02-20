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

    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;

    const result = await pool.query(`UPDATE  vehicles SET vehicle_name = $1, type = $2, registration_number = $3, daily_rent_price = $4, availability_status = $5  WHERE id = $6 RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status, vehicleId])

    return result;
}


const deleteVehicle = async (vehicleId: string)=> {


    const availabilityInfo = await pool.query(`SELECT  availability_status FROM vehicles WHERE id = $1`,[vehicleId])

    const checkAvailability = availabilityInfo.rows[0].availability_status;

    if(checkAvailability === 'booked'){
        throw new Error("Cannot Delete the Vehicle because it marked as booked")
    }
    
    const result = await pool.query(`DELETE FROM vehicles WHERE id = $1 RETURNING *`,[vehicleId]);

    return result;
}

export const vehicleServices = {
    addVehicles,
    getVehicles,
    getSpecificVehicles,
    updateVehicles,
    deleteVehicle
}