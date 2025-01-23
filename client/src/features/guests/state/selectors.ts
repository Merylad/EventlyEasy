import { createSelector } from "@reduxjs/toolkit";
import { selectGuests } from "./guestsSlice";

export const selectorGuestState = createSelector(
    [selectGuests],
    (eventsState) => {
       return eventsState.guests
});