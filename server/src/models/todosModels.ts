import { db } from "../config/db";

export interface NewTodoI {
    title: string;
    description: string;
    is_completed: boolean;
    priority: "high" | "medium" | "low" | null;
    event_id: string | number;
  }
  
  export interface TodoI extends NewTodoI {
    id: string | number;
  }

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

export const addTodoDB = async (todo : NewTodoI ) => {
    const {title, description, is_completed, priority, event_id} = todo

    try {
        const newTodo = await db('todo')
        .insert ({title, description, is_completed, priority, event_id}, ['id', 'title', 'description', 'is_completed', 'priority', 'event_id'])

        return newTodo
    } catch (error) {
        throw error
    }
}

export const updateTodoDB = async (todo : TodoI) => {
    const {id, title, description, is_completed, priority} = todo

    try {
        const updatedTodo = await db('todo')
        .update({title, description, is_completed, priority},['id', 'title', 'description', 'is_completed', 'priority', 'event_id'] )
        .where({id })

        return updatedTodo
    } catch (error) {
        throw error
    }
}

export const deleteTodoDB = async (id : string | number) => {
    try {
        await db('todo')
        .delete()
        .where({id})
    } catch (error) {
        throw error
    }
}

export const toggleTodoDB = async (id:string | number) => {
    try {
        const todo = await db('todo').select('is_completed').where({ id }).first();
        if (!todo) {
          throw new Error('Todo not found');
        }

        const updatedStatus = !todo.is_completed;

        const updatedTodo =  await db('todo')
        .update({ is_completed: updatedStatus }, ['id', 'title', 'description', 'is_completed', 'priority', 'event_id'])
        .where({ id });

        return updatedTodo
    } catch (error) {
        throw error
    }
}