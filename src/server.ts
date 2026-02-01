import express, { Request, Response } from 'express';
import initDb from './config/db';
import dotenv from "dotenv";
import path from "path";


dotenv.config({path: path.join(process.cwd(), ".env")})
const app = express()
const port = 5000

// parser
app.use(express.json());

// initializing DB
// initDb();


app.get('/', (req: Request, res: Response) => {
  res.send('Powering Up Your Vehicles$$')
})


app.post("/", (req: Request , res: Response)=>{
    console.log(req.body)

    res.status(201).json({
        success: true,
        message: "api working"
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
