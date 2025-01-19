import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../../app/store";

// Define types for the slice state
interface User {
  id: string | number;
  username: string;
  email: string;
  token : string;
}

interface UsersState {
  user: User;
  loggedIn: boolean;
  status: 'idle' | 'loading' | 'failed';
  error : string | null
}

// Define the initial state using the UsersState type
const initialState: UsersState = {
  user : {
    id : '',
    username : '',
    email : '',
    token : ''
  },
  loggedIn: false,
  status: 'idle',
  error : null
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchLogin = createAsyncThunk(
  'users/fetchLogin',
  async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiBaseUrl}/api/users/login`,
        { email, password },
        { withCredentials: true }
    );
      return response.data; 
    } catch (error : any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchRegister = createAsyncThunk(
  'users/fetchRegister',
  async ({ email, password, username }: { email: string, password: string, username : string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiBaseUrl}/api/users/register`,
        { email, password, username },
        { withCredentials: true }
    );
      return response.data; 
    } catch (error : any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setError : (state, action) => {
      state.error = action.payload
    },
    logout: (state) => {
      state.user = initialState.user;
      state.loggedIn = initialState.loggedIn;
      state.status = initialState.status;
      state.error = initialState.error;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload.user;
        state.user.token = action.payload.token
        state.loggedIn = true;
        state.error = null;  // Clear error on successful login
      })
      .addCase(fetchLogin.rejected, (state, action:any) => {
        state.status = 'failed';
        state.error = action.payload.message as string; // Set the error from rejected value
      })
      .addCase(fetchRegister.rejected, (state, action:any) => {
        state.status = 'failed';
        state.error = action.payload.message as string; 
      })
      .addCase(fetchRegister.fulfilled, state => {
        state.error = null
      })
  },
});


export const selectUser = (state: RootState) => state;
export const {setError, logout} = usersSlice.actions
export default usersSlice.reducer;