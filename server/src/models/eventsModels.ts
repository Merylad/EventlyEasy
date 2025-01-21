import { db } from "../config/db";

interface Event {
    id: number;
    user_id: string | number;
    name: string;
    date: Date;
}

type PlacesT = {
    id?: string | number;
    name: string;
    url?: string;
    price?: number | string;
    final_choice: boolean;
    description?: string;
    pros?: string[];
    cons?: string[];
    event_id: string | number;
  };

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

export const addPlaceDB = async(place : PlacesT) => {
    const {name, url, price, description, final_choice, pros, cons, event_id} = place

    try {
        const newPlace = await db('places')
        .insert({name, url, price, description, final_choice, pros, cons, event_id}, ['*'])

        return newPlace
    } catch (error) {
        throw error
    }
}

export const updatePlaceDB = async (place : PlacesT, id : string | number) => {
    const {name, url, price, description, final_choice, pros, cons} = place

    try {
        const updatedPlace = await db('places')
        .update ({name, url, price, description, final_choice, pros, cons}, ['*'])
        .where({id})

        return updatedPlace
    } catch (error) {
        throw error
    }
}

export const deletePlaceDB = async (id : string | number) => {
    try {
        await db('places')
        .delete()
        .where({id})

    } catch (error) {
        throw error
    }
}