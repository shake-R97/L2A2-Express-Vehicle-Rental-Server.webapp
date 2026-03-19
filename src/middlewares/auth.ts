import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {

    return async (req: Request, res: Response, next: NextFunction) => {

        try {
            const authHeader = req.headers.authorization;
            console.log({ authToken: authHeader });

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({
                    status: "Failed",
                    message: "No token found or Authorization header must be Bearer token"
                })
            }

            // removing the bearer

            const token = authHeader.split(" ")[1];

            if(!token){
                return res.status(401).json({
                    message: 'Invalid token format or missing Auth Bearer'
                })
            }

            const decoded = jwt.verify(token, config.jwt_secret!) as JwtPayload;

            console.log({ decoded });

            req.user = decoded 

            if(roles.length && !roles.includes(decoded.role)){
                return res.status(401).json({
                    status: 'Unauthorized',
                    message:'"Sorry" But you are not Authorized for that',
                })
            }

            next();

        } catch (err: any) {
            res.status(401).json({
                status: 'false',
                message: 'Invalid or expired token'
            })
        }
    }
}

export default auth;