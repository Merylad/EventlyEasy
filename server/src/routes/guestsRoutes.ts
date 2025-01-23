import { Router } from "express";
import { getGuestsByEvent, addGuest , updateGuest, deleteGuest, toggleGuest} from "../controllers/guestsControllers";

const router = Router()

router.get('/byevent/:eventId', getGuestsByEvent)
router.post('/add', addGuest)
router.put('/update/:guestId', updateGuest)
router.put('/toggle/:guestId', toggleGuest)
router.delete('/delete/:guestId', deleteGuest)

export default router