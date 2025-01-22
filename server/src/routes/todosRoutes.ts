import { Router } from "express";
import { getTodosByEvent, addTodo, updateTodo, deleteTodo, toggleTodo } from "../controllers/todosControllers";

const router = Router()

router.get('/byevent/:eventId', getTodosByEvent)
router.post('/addtodo', addTodo)
router.put('/updatetodo/:todoId', updateTodo)
router.put('/toggletodo/:todoId', toggleTodo)
router.delete('/deletetodo/:todoId', deleteTodo)



export default router