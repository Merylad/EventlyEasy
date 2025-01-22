import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../../app/store";

// Define types for the slice state
export interface TodoI {
  id: string | number;
  title : string,
  description : string,
  is_completed : boolean,
  priority : 'high' | 'medium' | 'low' | null,
  event_id : string | number
}

interface TodoState {
  todos: TodoI[];
  message : string
}

// Define the initial state using the UsersState type
const initialState: TodoState = {
todos : [],
message : ''
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchTodos = createAsyncThunk('todos/fetchTodos',
     async({eventId} : {eventId : string | number}, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiBaseUrl}/api/events/todos/byevent/${eventId}`)
            return response.data
        } catch (error : any) {
            return rejectWithValue(error.response.data);
        }
     })



const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {

    },
    
  extraReducers: (builder) => {
    builder
    .addCase(fetchTodos.fulfilled, (state, action)=>{
        state.todos = action.payload.todos
    })
  },
});



export const selectTodos = (state: RootState) => state;
export default todoSlice.reducer;