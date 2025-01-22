import { createSelector } from "@reduxjs/toolkit";
import { selectTodos } from "./todoSlice";

export const selectorTodoState = createSelector(
    [selectTodos],
    (eventsState) => {
       return eventsState.todos
});