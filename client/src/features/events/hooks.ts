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

    return useCallback((userId:string | number, name:string, date:string | Date) => {
        dispatch(fetchAddEvents( {userId, name, date} ));
      }, [dispatch]);

}

export const useFetchDeleteEvents = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useCallback((eventId:string | number) => {
        dispatch(fetchDeleteEvent( {eventId} ));
      }, [dispatch]);

}

export const useFetchUpdateEvent = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useCallback((eventId : string|number, name : string, date : string|Date) => {
        dispatch(fetchUpdateEvent( {eventId, name, date}  ));
      }, [dispatch]);

}

