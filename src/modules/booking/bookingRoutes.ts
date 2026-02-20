import { Router } from "express";
import auth from "../../middlewares/auth";
import { bookingControllers } from "./bookingControllers";

const router = Router();

router.post('/bookings', auth("admin", "customer"), bookingControllers.addBooking)


router.get('/bookings', auth("admin", "customer"), bookingControllers.getBooking)

router.put('/bookings/:bookingId', auth("admin", "customer"), bookingControllers.updateBookingStatus)

export const bookingRoutes = router;