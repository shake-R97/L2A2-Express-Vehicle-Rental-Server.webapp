import { Request, Response } from "express";
import { bookingServices } from "./bookingServices";

const addBooking = async (req: Request, res: Response) => {
    const body = req.body;
    console.log(body);
    try {
        const result = await bookingServices.addBooking(req.body);

        res.status(201).json({
            status: 'true',
            message: 'Booking created successfully',
            data: result.rows
        })

    } catch (err: any) {
        res.status(500).json({
            status: 'something went wrong',
            message: err.message
        })
    }
}


const getBooking = async (req: Request, res: Response) => {

    if (!req.user) {
        return res.status(404).json({
            status: false,
            message: "user not found please login"
        })
    }

    try {
        const result = await bookingServices.getBooking(req.user);

        if (result.rows.length === 0) {
            return res.status(404).json({
                status: 'false',
                message: "No data found , Please Book a car first to see the bookings"
            })
        }

        res.status(201).json({
            status: 'true',
            message: 'Get booked Vehicle successfully',
            result: result.rows
        })

    } catch (err: any) {
        res.status(500).json({
            status: 'something went wrong',
            message: err.message
        })
    }
}

const updateBookingStatus = async (req: Request, res: Response) => {

    if (!req.user) {
        return res.status(404).json({
            status: false,
            message: "user not found please login"
        })
    }

    const { bookingId } = req.params;

    if (!bookingId) {
        return res.status(400).json({
            status: false,
            message: "Bad request booking id was missing"
        })
    }

    const status = req.body.status;


    try {

        const result = await bookingServices.updateBookingStatus(status, req.user, bookingId as string);

        if (status === 'cancelled') {
            res.status(200).json({
                success: true,
                message: "Booking Cancelled successfully",
                data: result.booking
            })
        }

        if (status === 'returned') {
            res.status(200).json({
                success: true,
                message: "Booking Marked as returned. Vehicle is now available",
                data: {
                    ...result.booking,
                    vehicle: result.vehicle
                }
            })
        }

    } catch (err: any) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}


export const bookingControllers = {
    addBooking,
    getBooking,
    updateBookingStatus,
}