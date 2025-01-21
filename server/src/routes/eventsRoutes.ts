import { Router } from "express";
import { getEventsByUser, addEvent, deleteEvent, updateEvent, getEventById, getPlacesByEvent } from "../controllers/eventsControllers";

const router = Router()

router.get('/users/:userId', getEventsByUser)
router.post('/addevent', addEvent)
router.delete('/delete/:eventId', deleteEvent)
router.put('/update/:eventId', updateEvent)

router.get('/event/:eventId', getEventById)

router.get('/places/byevent/:eventId', getPlacesByEvent)

export default router