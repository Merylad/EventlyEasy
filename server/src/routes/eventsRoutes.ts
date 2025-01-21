import { Router } from "express";
import { getEventsByUser, addEvent, deleteEvent, updateEvent, getEventById, getPlacesByEvent, addPlace, updatePlace, deletePlace} from "../controllers/eventsControllers";

const router = Router()

router.get('/users/:userId', getEventsByUser)
router.post('/addevent', addEvent)
router.delete('/delete/:eventId', deleteEvent)
router.put('/update/:eventId', updateEvent)

router.get('/event/:eventId', getEventById)

router.get('/places/byevent/:eventId', getPlacesByEvent)
router.post('/places/addPlace', addPlace)
router.put('/places/update/:placeId', updatePlace)
router.delete('/places/delete/:placeId', deletePlace )

export default router