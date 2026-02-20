import { JwtPayload } from "jsonwebtoken";
import { pool } from "../../config/db";
import bcrypt from "bcryptjs";


const getUser = async ()=> {
    const result = await pool.query(`SELECT id, name, email, phone, role FROM users`);
    return result;
}

const getSpecificUser = async (userId: string)=> {
    const result = await pool.query(`SELECT * FROM users WHERE id=$1`,[userId]);

    return result;
}

const updateUserData = async (payload: Record<string, unknown>, userId: string, currentUser: JwtPayload)=> {

    const userIdToNumber = Number(userId);

    if(currentUser.role === 'customer' && userIdToNumber !== currentUser.id){
        throw new Error('You cannot Update others data')
    }

    const userCheck = await pool.query(`SELECT * FROM users WHERE id = $1`,[userId])

    if(!userCheck.rows.length){
        throw new Error ('User not found');
    }

    let {name, email, password, phone} = payload;

    if(password){
        const saltRound = 10;
        password = await bcrypt.hash(password as string,saltRound)
    } else {
        password = userCheck.rows[0].password;
    }

    
    const result = await pool.query(`UPDATE users SET name=$1, email=$2, password=$3, phone=$4 WHERE id=$5 RETURNING id, name, email, phone, role`,[name ?? userCheck.rows[0].name, email ?? userCheck.rows[0].email, password, phone ?? userCheck.rows[0].phone, userId]);

    return result;
}

const deleteUser = async (userId: string)=> {

    const bookingStatus = await pool.query(`SELECT 1 FROM bookings WHERE customer_id = $1 LIMIT 1`,[userId])

    
    if(bookingStatus.rows.length > 0){
        throw new Error('Sorry Cannot Delete, as User has active booking')
    }

    const result = await pool.query(`DELETE FROM users WHERE id=$1`,[userId])

    return result;
}


export const userServices = {
    getUser,
    getSpecificUser,
    updateUserData,
    deleteUser,
}