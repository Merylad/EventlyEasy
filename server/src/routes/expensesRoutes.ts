import { Router } from "express";
import { getExpensesByEvent , addExpense, updateExpense, deleteExpense} from "../controllers/expensesControllers";

const router = Router()

router.get('/byevent/:eventId', getExpensesByEvent)
router.post('/add', addExpense)
router.put('/update/:expenseId', updateExpense)
router.delete('/delete/:expenseId', deleteExpense)

export default router