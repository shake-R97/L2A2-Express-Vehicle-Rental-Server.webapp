import { Router } from "express";
import auth from "../../middlewares/auth";
import { vehiclesControllers } from "./vehicleController";

const router = Router();

router.post('/', auth('admin'), vehiclesControllers.addVehicles)


router.get('/', auth("admin","customer"), vehiclesControllers.getVehicles)


router.get('/:vehicleId', auth("admin", "customer"), vehiclesControllers.getSpecificVehicles)


router.put('/:vehicleId' , auth("admin"), vehiclesControllers.updateVehicles)


router.delete('/:vehicleId', auth("admin"), vehiclesControllers.deleteVehicle)


export const vehicleRoutes = router;