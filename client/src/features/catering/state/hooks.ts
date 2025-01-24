import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../../app/store";
import { useCallback } from "react";
import { selectorCateringState } from "./selectors";
import { fetchCatering, fetchAddCatering, fetchDeleteCatering, fetchUpdateCatering, NewCateringI, setError } from "./cateringSlice";


export const useCateringSelector = () => {
    return useSelector(selectorCateringState)
}

export const useFetchCatering = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useCallback((eventId : string | number, ) => {
          dispatch(fetchCatering( {eventId} ));
        }, [dispatch]);
}

export const useFetchAddCatering = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useCallback(async (catering : NewCateringI, eventId : string | number) => {
       await dispatch(fetchAddCatering({catering}))
       dispatch(fetchCatering( {eventId} ));
    },[dispatch])
}

export const useFetchUpdateCatering = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useCallback(async(catering : NewCateringI, cateringId : string | number,eventId : string | number ) => {
       await dispatch(fetchUpdateCatering({catering, cateringId}))
       dispatch(fetchCatering( {eventId} ));
    },[dispatch])
}

export const useFetchDeleteCatering= () => {
    const dispatch = useDispatch<AppDispatch>();

    return useCallback(async(cateringId : string | number, eventId : string | number)=> {
        await dispatch(fetchDeleteCatering({cateringId}))
        dispatch(fetchCatering( {eventId} ));

    }, [dispatch])
}

export const useSetError = () => {
    const dispatch = useDispatch<AppDispatch>();
  
    return useCallback((err : string) => {
      dispatch(setError( err ));
    }, [dispatch]);
}