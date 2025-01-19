import { createSelector } from "@reduxjs/toolkit";
import { selectEvents } from "./eventsSlice";

export const selectorEventsState = createSelector(
    [selectEvents],
    (eventsState) => {
       return eventsState.events
});