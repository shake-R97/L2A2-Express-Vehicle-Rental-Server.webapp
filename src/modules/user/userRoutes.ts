import express from 'express';
import { userControllers } from './userController';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/users', auth("admin"), userControllers.getUser)

router.get('/get/:id', userControllers.getSpecificUser)

router.put('/users/:userId', auth("admin", "customer"), userControllers.updateUserData)

router.delete('/users/:userId', auth('admin'), userControllers.deleteUser)



export const userRoutes = router;
