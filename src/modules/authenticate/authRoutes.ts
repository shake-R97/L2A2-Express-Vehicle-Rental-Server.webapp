import { Router } from "express";
import { authControllers } from "./authControllers";

const router = Router();


router.post('/signup', authControllers.signUpUser)

router.post("/signin", authControllers.loginUser)


export const authRoutes = router;