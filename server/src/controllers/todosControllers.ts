import { Request, Response } from "express";

import { getTodosByEventDB, addTodoDB , updateTodoDB, deleteTodoDB, toggleTodoDB} from "../models/todosModels";

export const getTodosByEvent = async (req:Request, res:Response) => {
    const {eventId} = req.params

    try {
        const todos = await getTodosByEventDB(eventId)
        res.status(201).json({todos})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const addTodo = async (req:Request, res:Response) => {
    const newTodo = req.body

    try {
        const todo = await addTodoDB(newTodo)
        res.status(201).json({message : 'Task successfully added', todo})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateTodo = async (req:Request, res:Response) => {
    const newTodo = req.body
    const {todoId} = req.params

    const todo = {...newTodo, id : todoId}
    console.log('todo', todo)

    try {
        const updatedTodo = await updateTodoDB(todo)
        res.status(201).json({message : 'Task successfully updated', todo : updatedTodo})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const deleteTodo = async (req:Request, res:Response) => {
    const {todoId} = req.params

    try {
        await deleteTodoDB(todoId)
        res.status(201).json({message: 'Task successfully deleted'})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const toggleTodo = async (req:Request, res:Response) => {
    const {todoId} = req.params

    try {
        const updatedTodo = await toggleTodoDB(todoId)
        res.status(201).json({message : 'Task successfully toggled', todo : updatedTodo})

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
}