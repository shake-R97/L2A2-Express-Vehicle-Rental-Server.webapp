import express, { Request, Response } from 'express';
import initDb from './config/db';
import config from './config';
import { userRoutes } from './modules/user/userRoutes';
import { authRoutes } from './modules/authenticate/authRoutes';
import { vehicleRoutes } from './modules/vehicle/vehicleRouter';
import { bookingRoutes } from './modules/booking/bookingRoutes';




const app = express()
const port = config.port;

// parser
app.use(express.json());

// initializing DB
initDb();


app.get('/', (req: Request, res: Response) => {
  res.send('Powering Up Your Vehicles$$')
})


// user crud
app.use('/api/v1', userRoutes)


// auth routes
app.use('/api/v1/auth', authRoutes)

// Vehicle routes
app.use('/api/v1/vehicles', vehicleRoutes)

// bookingRoutes
app.use('/api/v1', bookingRoutes)


// app.post("/", (req: Request , res: Response)=>{
//     console.log(req.body)

//     res.status(201).json({
//         success: true,
//         message: "api working"
//     })
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
