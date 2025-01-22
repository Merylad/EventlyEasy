import { Request, Response } from "express";

import { getTodosByEventDB } from "../models/todosModels";

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