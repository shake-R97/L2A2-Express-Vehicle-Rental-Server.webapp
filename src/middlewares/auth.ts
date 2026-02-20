import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {

    return async (req: Request, res: Response, next: NextFunction) => {

        try {
            const token = req.headers.authorization;
            console.log({ authToken: token });

            if (!token) {
                return res.status(500).json({
                    status: "Wasted ? You don't have toke",
                    message: "you are not allowed!!"
                })
            }

            const decoded = jwt.verify(token, config.jwt_secret!) as JwtPayload;

            console.log({ decoded });

            req.user = decoded 

            if(roles.length && !roles.includes(decoded.role)){
                return res.status(401).json({
                    message:'You are not Authorized to go there',
                    error: 'Unauthorized Go Back'
                })
            }

            next();

        } catch (err: any) {
            res.status(500).json({
                status: 'false',
                message: err.message
            })
        }
    }
}

export default auth;