import { db } from "../config/db";

export const getTodosByEventDB = async (id : number | string) => {
    try {
        const todos = await db('todo')
        .select('id', 'title', 'description', 'is_completed', 'priority')
        .where({event_id : id})

        return todos
    } catch (error) {
        throw error
    }
}