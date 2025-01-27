import { db } from "../config/db";

type ExpenseT = {
    name : string,
    price : number, 
    event_id : number | string
}

export const getExpensesByEventDB = async (eventId : string | number) => {
    try {
        const expenses = await db ('expenses')
        .select ('id', 'name', 'price')
        .where({event_id : eventId})

        return expenses
    } catch (error) {
        throw error
    }
}

export const addExpenseDB = async (expense:ExpenseT) => {
    const {name, price, event_id} = expense

    try {
        const newExpense = await db('expenses')
        .insert ({name, price, event_id}, ['id', 'name', 'price'])

        return newExpense
    } catch (error) {
        throw error
    }
}

export const updateExpenseDB = async (expense:ExpenseT, expenseId : string | number) => {
    const {name, price} = expense

    try {
        const updatedExpense = await db('expenses')
        .update({name, price}, ['id', 'name', 'price'])
        .where({id : expenseId})

        return updatedExpense
    } catch (error) {
        throw error
    }
}

export const deleteExpenseDB = async(expenseId : string | number) => {
    try {
        await db('expenses')
        .delete()
        .where({id : expenseId})
    } catch (error) {
        throw error
    }
}