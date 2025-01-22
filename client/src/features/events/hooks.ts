import { useDispatch, useSelector } from "react-redux"
import { selectorEventsState } from "./state/selectors"
import { fetchEvents, fetchAddEvents, fetchDeleteEvent, fetchUpdateEvent} from "./state/eventsSlice"
import { AppDispatch } from "../../app/store";
import { useCallback } from "react";

export const useEventsSelector = () => {
    return useSelector(selectorEventsState)
}

export const useFetchEvents = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useCallback((id : string | number) => {
          dispatch(fetchEvents( {id} ));
        }, [dispatch]);
}

export const useFetchAddEvents = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useCallback(async(userId:string | number, name:string, date:string | Date) => {
       await dispatch(fetchAddEvents( {userId, name, date} ));
       dispatch(fetchEvents( {id :userId} ));
      }, [dispatch]);

}

export const useFetchDeleteEvents = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useCallback(async (eventId:string | number, userId:string | number) => {
        await dispatch(fetchDeleteEvent( {eventId} ));
        dispatch(fetchEvents( {id :userId} ));
      }, [dispatch]);

}

export const useFetchUpdateEvent = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useCallback(async (eventId : string|number, name : string, date : string|Date, userId:string | number) => {
        await dispatch(fetchUpdateEvent( {eventId, name, date}  ));
        dispatch(fetchEvents( {id :userId} ));
      }, [dispatch]);

}

