import { Request, Response } from "express";
import { getEventsByUserDB, addEventDB, deleteEventDB, updateEventDB } from "../models/eventsModels";

export const getEventsByUser = async (req : Request, res: Response) => {
    const {userId} = req.params

    try {
        const events = await getEventsByUserDB(userId)
        res.status(201).json(events)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const addEvent = async (req : Request, res: Response)=>{
    const {userId, name, date} = req.body

    try {
        const event = await addEventDB(userId, name, date)
        res.status(201).json({message : 'Event successfully added', event})

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }

    
}

export const deleteEvent = async (req : Request, res : Response) => {
    const {eventId} = req.params

    try {
        await deleteEventDB(eventId)
        res.status(201).json({message : 'Event deleted successfully'})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateEvent = async (req : Request, res : Response) => {
    const {eventId} = req.params
    const {name, date} = req.body

    try {
        const event = await updateEventDB(name, date, eventId)
        res.status(201).json({message : 'Event successfully updated', event})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
}