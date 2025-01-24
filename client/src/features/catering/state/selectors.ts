import { createSelector } from "@reduxjs/toolkit";
import { selectCatering } from "./cateringSlice";

export const selectorCateringState = createSelector(
    [selectCatering],
    (eventsState) => {
       return eventsState.catering
});