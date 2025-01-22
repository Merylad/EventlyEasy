import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../../app/store";
import { useCallback } from "react";
import { selectorTodoState } from "./selectors";
import { fetchTodos, fetchAddTodos, NewTodoI, TodoI, fetchUpdateTodo, fetchToggleTodo, fetchDeleteTodo } from "./todoSlice";

export const useTodoSelector = () => {
    return useSelector(selectorTodoState)
}

export const useFetchTodos = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useCallback((eventId : string | number, ) => {
          dispatch(fetchTodos( {eventId} ));
        }, [dispatch]);
}

export const useFetchAddTodos = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useCallback(async (todo : NewTodoI, eventId : string | number) => {
       await dispatch(fetchAddTodos({todo}))
       dispatch(fetchTodos( {eventId} ));
    },[dispatch])
}

export const useFetchUpdateTodo = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useCallback(async(todo : NewTodoI, todoId : string | number,eventId : string | number ) => {
       await dispatch(fetchUpdateTodo({todo, todoId}))
       dispatch(fetchTodos( {eventId} ));
    },[dispatch])
}

export const useFetchToggleTodo = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useCallback(async(todoId : string | number, eventId : string | number)=> {
        await dispatch(fetchToggleTodo({todoId}))
        dispatch(fetchTodos( {eventId} ));

    }, [dispatch])
}

export const useFetchDeleteTodo = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useCallback(async(todoId : string | number, eventId : string | number)=> {
        await dispatch(fetchDeleteTodo({todoId}))
        dispatch(fetchTodos( {eventId} ));

    }, [dispatch])
}