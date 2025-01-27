import { createSelector } from "@reduxjs/toolkit";
import { selectExpense } from "./expenseSlice";

export const selectorExpenseState = createSelector(
    [selectExpense],
    (eventsState) => {
       return eventsState.expenses
});