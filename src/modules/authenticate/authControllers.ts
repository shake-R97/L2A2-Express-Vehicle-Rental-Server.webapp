import { Request, Response } from "express";
import { authServices } from "./authServices";
import { userServices } from "../user/userServices";


const signUpUser = async(req: Request, res: Response) => {

    try {

        const result =  await authServices.signUpUser(req.body);

        res.status(201).json({
            success: true,
            message: 'User registered Successfully',
            data: result.rows[0] 
        })
        
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}


const loginUser = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {

        const result = await authServices.loginUser(email, password);

        res.status(200).json({
            success: true,
            message: 'User Logged in Successfully',
            data: result
        })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            message2: 'You are not a real BlackHat',
            caution: 'Type the Original Password or Email otherwise Shots will be taken against you'
        })
    }
}


export const authControllers = {
    signUpUser,
    loginUser,
}