import { Router } from "express";
import { getEventsByUser, addEvent, deleteEvent, updateEvent } from "../controllers/eventsControllers";

const router = Router()

router.get('/users/:userId', getEventsByUser)
router.post('/addevent', addEvent)
router.delete('/delete/:eventId', deleteEvent)
router.put('/update/:eventId', updateEvent)

export default router