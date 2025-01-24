import { db } from "../config/db";

export type NewCatering = {
    name : string,
    cost_per_guest : number,
    additional_fees : number,
    is_final_choice : boolean,
    notes : string,
    event_id : string | number
}

export const getCateringByEventDB = async (eventId : number|string ) => {
    try {
        const catering = await db('catering')
        .select('id', 'name', 'cost_per_guest', 'additional_fees', 'is_final_choice','notes')
        .where ({event_id : eventId})

        return catering
    } catch (error) {
        throw error
    }
}

export const addCateringDB = async (catering : NewCatering) => {
    const {name, cost_per_guest, additional_fees, is_final_choice, notes, event_id} = catering

    try {
        const newCatering = await db('catering')
        .insert ({name, cost_per_guest, additional_fees, is_final_choice, notes, event_id}, ['id', 'name', 'cost_per_guest', 'additional_fees', 'is_final_choice','notes'])

        return newCatering
    } catch (error) {
        throw error
    }
}

export const updateCateringDB = async (catering : NewCatering, cateringId : number | string) => {
    const {name, cost_per_guest, additional_fees, is_final_choice, notes} = catering

    try {
        const updatedCatering = await db('catering')
        .update({name, cost_per_guest, additional_fees, is_final_choice, notes}, ['id', 'name', 'cost_per_guest', 'additional_fees', 'is_final_choice','notes'])
        .where({id : cateringId})

        return updatedCatering
    } catch (error) {
        throw error
    }
}

export const deleteCateringDB = async (cateringId : string | number) => {
    try {
        await db('catering')
        .delete()
        .where({id : cateringId})
    } catch (error) {
        throw error
    }
}