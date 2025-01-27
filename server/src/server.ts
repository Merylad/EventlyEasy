import express from "express";
import path from 'path';
import cors from 'cors';
import usersRouter from './routes/usersRoutes'
import eventsRouter from './routes/eventsRoutes'
import todosRouter from './routes/todosRoutes'
import guestsRouter from './routes/guestsRoutes'
import cateringRouter from './routes/cateringRoutes'
import expensesRouter from './routes/expensesRoutes'

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
app.use('/api/events/guests', guestsRouter)
app.use('/api/events/catering', cateringRouter)
app.use('/api/events/expenses', expensesRouter)

console.log(path.join(__dirname, '../../client/dist'))

app.use(express.static(path.join(__dirname, '../../client/dist')));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/dist', 'index.html'));
  });

console.log('resolve',path.resolve(__dirname, '../../client/dist', 'index.html') )

