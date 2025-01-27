import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../../app/store";
import { useCallback } from "react";
import { selectorGuestState } from "./selectors";
import { fetchAddGuests, fetchDeleteGuest, fetchGuests, fetchToggleGuest, fetchUpdateGuest, NewGuestI, setError, setStatusForGuest } from "./guestsSlice";


export const useGuestSelector = () => {
    return useSelector(selectorGuestState)
}

export const useFetchGuests = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useCallback((eventId : string | number, ) => {
          dispatch(fetchGuests( {eventId} ));
        }, [dispatch]);
}

export const useFetchAddGuests = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useCallback(async (guest : NewGuestI, eventId : string | number) => {
       await dispatch(fetchAddGuests({guest}))
       dispatch(fetchGuests( {eventId} ));
    },[dispatch])
}

export const useFetchUpdateGuest = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useCallback(async(guest : NewGuestI, guestId : string | number,eventId : string | number ) => {
       await dispatch(fetchUpdateGuest({guest, guestId}))
       dispatch(fetchGuests( {eventId} ));
    },[dispatch])
}

export const useFetchToggleGuest = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useCallback(async(guestId : string | number, eventId : string | number)=> {
        await dispatch(fetchToggleGuest({guestId}))
        dispatch(fetchGuests( {eventId} ));

    }, [dispatch])
}

export const useFetchDeleteGuest= () => {
    const dispatch = useDispatch<AppDispatch>();

    return useCallback(async(guestId : string | number, eventId : string | number)=> {
        await dispatch(fetchDeleteGuest({guestId}))
        dispatch(fetchGuests( {eventId} ));

    }, [dispatch])
}

export const useSetError = () => {
    const dispatch = useDispatch<AppDispatch>();
  
    return useCallback((err : string) => {
      dispatch(setError( err ));
    }, [dispatch]);
}

export const useSetStatusForGuest = () => {
    const dispatch = useDispatch<AppDispatch>();
  
    return useCallback((status : boolean) => {
      dispatch(setStatusForGuest( status ));
    }, [dispatch]);
}