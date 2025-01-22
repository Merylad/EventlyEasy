import { selectorUserState } from "./selectors";
import { useSelector, useDispatch } from "react-redux";
import { fetchLogin, setError , fetchRegister, logout} from "./usersSlice";
import { useCallback } from "react";
import { AppDispatch } from "../../../app/store";

export const useUserSelector = () => {  
    return useSelector(selectorUserState)
}

export const useFetchLogin = () => {
    const dispatch = useDispatch<AppDispatch>();
  
    return useCallback((email: string, password: string) => {
      dispatch(fetchLogin( {email, password} ));
    }, [dispatch]);
  };

export const useSetError = () => {
    const dispatch = useDispatch<AppDispatch>();
  
    return useCallback((err : string) => {
      dispatch(setError( err ));
    }, [dispatch]);
}

export const useFetchRegister = () => {
    const dispatch = useDispatch<AppDispatch>();
  
    return useCallback((email: string, password: string, username:string) => {
      dispatch(fetchRegister( {email, password, username} ));
    }, [dispatch]);
}

export const useLogout = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(()=> {
    
    dispatch(logout())
  }, [])
}