import { Request, Response } from "express";
import { getGuestsByEventDB, addGuestDB, updateGuestDB , deleteGuestDB, toggleGuestDB} from "../models/guestsModels";

export const getGuestsByEvent = async (req : Request, res: Response) => {
    const {eventId} = req.params

    try {
        const guests = await getGuestsByEventDB(eventId)
        
        res.status(201).json({guests})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const addGuest = async (req : Request, res: Response) => {
    const guest = req.body

    if (guest.name === ''){
        res.status(400).json({ message: 'Please provide a name for the guest' });
        return
    }

    try {
        const newGuest = await addGuestDB(guest)
        res.status(201).json({message : 'Guest successfully added', guest : newGuest})
    } catch (error : any) {
        console.log(error)

        if(error.code === '23505'){
            res.status(400).json({message : 'Email already exists'})
            return
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateGuest = async (req : Request, res: Response) => {
    const {guestId} = req.params
    const guest = req.body

    try {
        const updatedGuest = await updateGuestDB(guestId, guest)
        res.status(201).json({message : 'Guest successfully updated', guest : updatedGuest})
    } catch (error:any) {
        console.log(error)

        if(error.code === '23505'){
            res.status(400).json({message : 'Email already exists'})
            return
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const deleteGuest = async (req : Request, res: Response) => {
    const {guestId} = req.params

    try {
        await deleteGuestDB(guestId)
        res.status(201).json({message : 'Guest successfully deleted'})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const toggleGuest = async (req : Request, res: Response) => {
    const {guestId} = req.params

    try {
        const updatedGuest = await toggleGuestDB(guestId)
        res.status(201).json({message : 'Guest successfully updated', guest : updatedGuest})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
}