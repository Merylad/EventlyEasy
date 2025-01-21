import { db } from "../config/db";

interface Event {
    id: number;
    user_id: string | number;
    name: string;
    date: Date;
}

export const getEventsByUserDB = async(id : number | string) => {
    try {
        const events = await db('events')
        .where ({user_id : id})

        return events
    }catch(error){
        throw error
    }
}

export const addEventDB = async (userId : string | number, name : string, date : Date) => {
    try {
        const [event] = await db('events')
        .insert({
            user_id : userId,
            name,
            date
        }, ['id', 'name', 'date'])
        return event
    } catch (error) {
        throw error
    }
}

export const deleteEventDB = async (id: string | number) => {
    try {
        await db('events')
        .delete()
        .where({id})
    } catch (error) {
        throw error
    }
}

export const updateEventDB = async (name : string, date : Date, eventId : string|number) => {
    try {
        const [event] = await db('events')
        .update (
            {name, date},
        ['id', 'name', 'date']
    )
        .where({id : eventId})

        return event
        
    } catch (error) {
        throw error
    }
}

export const getEventByIdDB = async(id : string | number) => {
    try {
        const [event] = await db('events')
        .select ('id', 'name', 'date')
        .where ({id})

        return event
    } catch (error) {
        throw error
    }
}

export const getPlacesByEventDB = async (id : string | number) => {
    try {
        const places = await db('places')
        .select('*')
        .where ({event_id : id})

        

        return places
    } catch (error) {
        throw error
    }
}