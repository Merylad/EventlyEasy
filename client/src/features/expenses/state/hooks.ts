import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../../app/store";
import { useCallback } from "react";
import { selectorExpenseState } from "./selectors";
import { fetchExpenses, fetchAddExpense, fetchDeleteExpense, fetchUpdateExpense, setError, NewExpenseI } from "./expenseSlice";

export const useExpenseSelector = () => {
    return useSelector(selectorExpenseState)
}

export const useFetchExpense = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useCallback((eventId : string | number, ) => {
          dispatch(fetchExpenses( {eventId} ));
        }, [dispatch]);
}

export const useFetchAddExpense = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useCallback(async (expense : NewExpenseI, eventId : string | number) => {
       await dispatch(fetchAddExpense({expense}))
       dispatch(fetchExpenses( {eventId} ));
    },[dispatch])
}

export const useFetchUpdateExpense = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useCallback(async(expense : NewExpenseI, expenseId : string | number,eventId : string | number ) => {
       await dispatch(fetchUpdateExpense({expense, expenseId}))
       dispatch(fetchExpenses( {eventId} ));
    },[dispatch])
}

export const useFetchDeleteExpense= () => {
    const dispatch = useDispatch<AppDispatch>();

    return useCallback(async(expenseId : string | number, eventId : string | number)=> {
        await dispatch(fetchDeleteExpense({expenseId}))
        dispatch(fetchExpenses( {eventId} ));

    }, [dispatch])
}

export const useSetError = () => {
    const dispatch = useDispatch<AppDispatch>();
  
    return useCallback((err : string) => {
      dispatch(setError( err ));
    }, [dispatch]);
}