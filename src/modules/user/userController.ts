import { Request, Response } from "express";
import { Result } from "pg";
import { userServices } from "./userServices";
import { JwtPayload } from "jsonwebtoken";


const getUser = async (req: Request , res: Response) => {
     
  try {

        const result =  await userServices.getUser();

        res.status(200).json({
            success: true,
            message: 'All Users Retrieved Successfully',
            data: result.rows 
        })
        
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

const getSpecificUser = async (req: Request , res: Response)=> {

        const userId = req.params.id;
    try {

        const result =  await userServices.getSpecificUser(userId as string);

        res.status(200).json({
            success: true,
            message: `Users id: ${userId} Retrieved Successfully`,
            data: result.rows 
        })
        
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

const updateUserData = async (req: Request , res: Response)=> {


    const userId = req.params.userId;
    const currentUser = req.user as JwtPayload;

    try {

        const result =  await userServices.updateUserData(req.body, userId as string, currentUser);

        res.status(200).json({
            success: true,
            message: `Users id: ${userId}, data has Updated Successfully`,
            data: result.rows 
        })
        
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
    
}


const deleteUser = async (req: Request , res: Response)=> {

    const userId = req.params.userId;

    try {

        const result =  await userServices.deleteUser(userId as string);
        

        res.status(200).json({
            success: true,
            message: `Users id: ${userId}, has deleted Successfully`, 
        })
        
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }    
}

export const userControllers = {
    getUser,
    getSpecificUser,
    updateUserData,
    deleteUser,
}