import {Pool} from "pg";

// db
export const pool = new Pool({
    connectionString: `${process.env.CONNECTION_STR}`
})


const initDb = async ()=>{
    await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            password TEXT NOT NULL,
            CONSTRAINT passwordMinLength CHECK (LENGTH(password) >= 6),
            phone VARCHAR(16) NOT NULL,
            role VARCHAR(10) NOT NULL CHECK (role IN ('admin', 'customer'))
            )
        `)
    
    await pool.query(`
           CREATE TABLE IF NOT EXISTS vehicles(
           id SERIAL PRIMARY KEY,
           vehicle_name VARCHAR(150) NOT NULL,
            type VARCHAR(10) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'suv')
            ),
            registration_number VARCHAR(100) NOT NULL UNIQUE,
            daily_rent_price NUMERIC(10) NOT NULL CHECK (daily_rent_price > 0),
            availability_status TEXT CHECK (availability_status IN ('available', 'booked'))
           )
        `)

    await pool.query(`
           CREATE TABLE IF NOT EXISTS bookings(
           id SERIAL PRIMARY KEY,
           customer_id INT REFERENCES users(id) ON DELETE CASCADE,
           vehicle_id  INT REFERENCES vehicles(id) ON DELETE CASCADE,
           rent_start_date DATE NOT NULL,
           rent_end_date DATE NOT NULL,
           CHECK (rent_end_date > rent_start_date),
           total_price NUMERIC NOT NULL CHECK (total_price > 0)
           status VARCHAR(50) NOT NULL DEFAULT "active"
           )
        `)    
}

export default initDb;