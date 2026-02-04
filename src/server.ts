import express, { Request, Response } from 'express';
import initDb from './config/db';
import config from './config';
import { userRoutes } from './modules/user/userRoutes';




const app = express()
const port = config.port;

// parser
app.use(express.json());

// initializing DB
initDb();


app.get('/', (req: Request, res: Response) => {
  res.send('Powering Up Your Vehicles$$')
})

app.use('/user', userRoutes)


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
