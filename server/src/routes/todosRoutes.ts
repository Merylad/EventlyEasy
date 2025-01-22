import { Router } from "express";
import { getTodosByEvent } from "../controllers/todosControllers";

const router = Router()

router.get('/byevent/:eventId', getTodosByEvent)



export default router