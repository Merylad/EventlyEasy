import express, { Request, Response } from "express";
import path from 'path';
import cors from 'cors';
import { db } from "./config/db";
import usersRouter from './routes/usersRoutes'
import eventsRouter from './routes/eventsRoutes'
import todosRouter from './routes/todosRoutes'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cors({
    credentials : true, //for the cookies
    origin : ['http://localhost:5173']
}))

app.use('/api/users', usersRouter)
app.use('/api/events', eventsRouter)
app.use('/api/events/todos', todosRouter)

app.use(express.static(path.join(__dirname, '../client/build')));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });

