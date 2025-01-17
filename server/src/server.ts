import express, { Request, Response } from "express";
import cors from 'cors';
import { db } from "./config/db";
import usersRouter from './routes/usersRoutes'

const app = express();
const PORT = 3000;

app.use(express.json())
app.use(cors({
    credentials : true, //for the cookies
    origin : ['http://localhost:5173']
}))

app.use('/api/users', usersRouter)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

