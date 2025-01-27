import { Request, Response } from "express";

import { getCateringByEventDB, addCateringDB , updateCateringDB, deleteCateringDB} from "../models/CateringModels";

export const getCateringByEvent = async (req:Request, res:Response) =>{
    const {eventId} = req.params

    try {
        const catering = await getCateringByEventDB(eventId)
        res.status(201).json({catering})
    } catch (error) {
        console.log(error)
        res.status(500).json({message : 'Internal server error'})
    }
}

export const addCatering = async (req:Request, res:Response) =>{
    const catering = req.body

    try {
        const newCatering = await addCateringDB(catering)
        res.status(201).json({message: 'New catering successfully added',catering :newCatering})
    } catch (error: any) {
        
        if(error.code === '23514'){
            res.status(400).json({message : 'Cost per guest or additional fees can not be negatives'})
            return
        }
        console.log(error)
        res.status(500).json({message : 'Internal server error'})
    }
}

export const updateCatering = async (req:Request, res:Response) =>{
    const {cateringId} = req.params
    const catering = req.body

    try {
        const updatedCatering = await updateCateringDB(catering, cateringId)
        res.status(201).json({message: 'Catering successfully updated',catering :updatedCatering})

    } catch (error : any) {

        if(error.code === '23514'){
            res.status(400).json({message : 'Cost per guest or additional fees can not be negatives'})
            return
        }
        console.log(error)
        res.status(500).json({message : 'Internal server error'})
    }
}

export const deleteCatering = async (req : Request, res: Response) => {
    const {cateringId} = req.params

    try {
        await deleteCateringDB(cateringId)
        res.status(201).json({message : 'Catering successfully deleted'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message : 'Internal server error'})
    }
}