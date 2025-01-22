import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../../app/store";
import { useCallback } from "react";
import { selectorTodoState } from "./selectors";
import { fetchTodos } from "./todoSlice";

export const useTodoSelector = () => {
    return useSelector(selectorTodoState)
}

export const useFetchTodos = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useCallback((eventId : string | number) => {
          dispatch(fetchTodos( {eventId} ));
        }, [dispatch]);
}