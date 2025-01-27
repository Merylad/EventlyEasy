import { Request, Response } from "express";

import { getExpensesByEventDB , addExpenseDB, updateExpenseDB, deleteExpenseDB} from "../models/expensesModels";

export const getExpensesByEvent = async (req : Request, res: Response) => {
    const {eventId} = req.params

    try {
        const expenses = await getExpensesByEventDB(eventId)

        res.status(201).json({expenses})
    } catch (error) {
        console.log(error)
        res.status(500).json({message : 'Internal server error'})
    }
}

export const addExpense = async (req : Request, res: Response) => {
    const expense = req.body

    try {
        const newExpense = await addExpenseDB(expense)
        res.status(201).json({message : 'New expense added successfully', expense : newExpense})
    } catch (error) {
        console.log(error)
        res.status(500).json({message : 'Internal server error'})
    }
}

export const updateExpense = async (req : Request, res: Response) => {
    const newExpense = req.body 
    const {expenseId} = req.params

    try {
        const updatedExpense = await updateExpenseDB(newExpense, expenseId)
        res.status(201).json({message : 'Expense updated successfully', expense : updatedExpense})
    } catch (error) {
        console.log(error)
        res.status(500).json({message : 'Internal server error'})
    }
}

export const deleteExpense = async (req : Request, res: Response) => {
    const {expenseId} = req.params

    try {
        await deleteExpenseDB(expenseId)
        res.status(201).json({message : 'Expense successfully deleted'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message : 'Internal server error'})
    }
}