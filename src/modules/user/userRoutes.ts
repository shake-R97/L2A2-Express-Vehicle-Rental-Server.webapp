import express from 'express';
import { userControllers } from './userController';

const router = express.Router();

router.post('/', userControllers.createUser)

router.get('/all', userControllers.getUser)

router.get('/get/:id', userControllers.getSpecificUser)

router.put('/update/:id', userControllers.updateUserData)

router.delete('/delete/user/:id', userControllers.deleteUser)



export const userRoutes = router;
