import express, { Request, Response } from "express";
import cors from 'cors';
import { db } from "./config/db";
import usersRouter from './routes/usersRoutes'
import eventsRouter from './routes/eventsRoutes'

const app = express();
const PORT = 3000;

app.use(express.json())
app.use(cors({
    credentials : true, //for the cookies
    origin : ['http://localhost:5173']
}))

app.use('/api/users', usersRouter)
app.use('/api/events', eventsRouter)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

