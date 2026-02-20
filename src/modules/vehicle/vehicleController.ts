import { Request, Response } from "express";
import { vehicleServices } from "./vehicleServices";

const addVehicles = async(req: Request , res: Response)=> {

    try {
        const result =  await vehicleServices.addVehicles(req.body);
        
        res.status(201).json({
            status: 'true',
            message:'Vehicle created successfully',
            data: result.rows
        })

    } catch (err: any) {
        res.status(500).json({
            status : 'something went wrong',
            message: err.message
        })
    }
}

const getVehicles = async (req: Request , res: Response)=> {
    
    
    try {
        const result =  await vehicleServices.getVehicles();

        if(!result.rows.length){
            return res.status(200).json({
                success: true,
                message: 'No vehicles were found',
                data: result.rows
            })
        }
        
        res.status(200).json({
            success: 'true',
            message:'Vehicles Retrieved Successfully',
            data: result.rows
        })

    } catch (err: any) {
        res.status(500).json({
            status : 'something went wrong',
            message: err.message
        })
    }
}

const getSpecificVehicles = async (req: Request , res: Response)=>{
    const vehicleId = req.params.vehicleId;

    if(!vehicleId){
        return res.status(400).json({
            status: false,
            message:'Vehicles Id required'
        })
    }

      try {
        const result =  await vehicleServices.getSpecificVehicles(vehicleId as string);
        
        res.status(200).json({
            status: true,
            message:'Vehicle Retrieved Successfully',
            data: result.rows
        })

    } catch (err: any) {
        res.status(500).json({
            status : 'something went wrong',
            message: err.message
        })
    }
}

const updateVehicles = async (req: Request , res: Response)=> {

    const vehicleId = req.params.vehicleId;

    if(!vehicleId){
        return res.status(400).json({
            status: false,
            message:'Vehicles Id required'
        })
    }

     try {
        const result =  await vehicleServices.updateVehicles(req.body, vehicleId as string);
        
        res.status(200).json({
            success: true,
            message:'Vehicle updated Successfully',
            data: result.rows
        })

    } catch (err: any) {
        res.status(500).json({
            status : 'something went wrong',
            message: err.message
        })
    }    
}

const deleteVehicle = async (req: Request , res: Response)=> {

const vehicleId = req.params.vehicleId;

    if(!vehicleId){
        return res.status(400).json({
            status: false,
            message:'Vehicles Id required'
        })
    }

     try {
        const result =  await vehicleServices.deleteVehicle(vehicleId as string);
        
        res.status(200).json({
            status: true,
            message:'Vehicle Deleted Successfully',
        })

    } catch (err: any) {
        res.status(500).json({
            status : 'something went wrong',
            message: err.message
        })
    }    

}

export const vehiclesControllers = {
    addVehicles,
    getVehicles,
    getSpecificVehicles,
    updateVehicles,
    deleteVehicle
}