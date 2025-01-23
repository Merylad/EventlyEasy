import { db } from "../config/db";

type GuestT = {
    name : string,
    email : string,
    is_attending : boolean,
    event_id : string | number
}

export const getGuestsByEventDB = async (eventId : number | string) => {
    try {
        const guests = await db('guests')
        .select('id', 'name', 'email', 'is_attending')
        .where({event_id: eventId})

        return guests
    } catch (error) {
        throw error
    }
}

export const addGuestDB = async(guest : GuestT) => {
    const {event_id, name, email, is_attending} = guest

    try {
        const newGuest = await db('guests')
        .insert ({event_id, name, email, is_attending}, ['id', 'name', 'email', 'is_attending'])

        return newGuest
    } catch (error) {
        throw error
    }
}

export const updateGuestDB = async (guestId : string | number, guest : GuestT) => {
    const {name, email, is_attending} = guest
    try {
        const updatedGuest = await db('guests')
        .update ({name, email, is_attending}, ['id', 'name', 'email', 'is_attending'])
        .where({id : guestId})

        return updatedGuest
    } catch (error) {
        throw error
    }
}

export const deleteGuestDB = async (guestId : string|number) => {
    try {
        await db('guests')
        .delete()
        .where({id : guestId})
    } catch (error) {
        throw error
    }
}

export const toggleGuestDB = async (guestId : string | number) => {
    try {
        const guest = await db('guests').select('is_attending').where({ id : guestId }).first();
        if (!guest) {
          throw new Error('Todo not found');
        }

        const updatedStatus = !guest.is_attending;

        const updatedGuest =  await db('guests')
        .update({ is_attending: updatedStatus }, ['id', 'name', 'email', 'is_attending'])
        .where({ id : guestId });

        return updatedGuest
    } catch (error) {
        throw error
    }
}