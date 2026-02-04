import { pool } from "../../config/db"

const createUser = async ( payload : Record<string, unknown>)=> {

    const {name , email, password, phone, role} = payload;

  const result = await pool.query(`INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`, [name, email, password, phone, role])

  return result;
}

const getUser = async ()=> {
    const result = await pool.query(`SELECT * FROM users`);
    return result;
}

const getSpecificUser = async (userId: string)=> {
    const result = await pool.query(`SELECT * FROM users WHERE id=$1`,[userId]);

    return result;
}

const updateUserData = async (payload: Record<string, unknown>, userId: string)=> {

    const {name, email, password, phone} = payload;
    
    const result = await pool.query(`UPDATE users SET name=$1, email=$2, password=$3, phone=$4 WHERE id=$5 RETURNING *`,[name, email, password, phone, userId]);

    return result;
}

const deleteUser = async (userId: string)=> {

    const result = await pool.query(`DELETE FROM users WHERE id=$1`,[userId])

    return result;
}


export const userServices = {
    createUser,
    getUser,
    getSpecificUser,
    updateUserData,
    deleteUser,
}