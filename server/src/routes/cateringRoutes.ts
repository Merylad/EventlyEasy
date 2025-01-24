import { Router } from "express";
import { getCateringByEvent, addCatering, updateCatering, deleteCatering } from "../controllers/cateringControllers";

const router = Router()

router.get('/byevent/:eventId', getCateringByEvent )
router.post('/add', addCatering)
router.put('/update/:cateringId', updateCatering)
router.delete('/delete/:cateringId', deleteCatering)



export default router