import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../../app/store";

// Define types for the slice state
export interface NewTodoI {
  title: string;
  description: string;
  is_completed: boolean;
  priority: "high" | "medium" | "low" | null;
  event_id: string | number;
}

export interface TodoI extends NewTodoI {
  id: string | number;
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

export const fetchAddTodos = createAsyncThunk('todos/addTodos', async({todo} : {todo : NewTodoI}, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/api/events/todos/addtodo`, todo)
      return response.data
    } catch(error : any){
      return rejectWithValue(error.response.data);
    }
})

export const fetchUpdateTodo = createAsyncThunk ('todos/fetchUpdateTodo', async({todo, todoId} : {todo : NewTodoI, todoId : string | number}, {rejectWithValue})=> {
  try {
    const response = await axios.put(`${apiBaseUrl}/api/events/todos/updatetodo/${todoId}`, todo)
    return response.data

  } catch (error : any) {
    return rejectWithValue(error.response.data);
  }
})

export const fetchToggleTodo = createAsyncThunk('todos/fetchToggleTodo', async({todoId} : {todoId : string | number}, {rejectWithValue} )=>{
  try {
    const response = await axios.put(`${apiBaseUrl}/api/events/todos/toggletodo/${todoId}`)
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
    .addCase(fetchTodos.rejected, (state, action : any)=>{
      state.message = action.payload.message
  })
    .addCase(fetchAddTodos.fulfilled, (state, action) => {
      state.message = action.payload.message
    })
    .addCase(fetchAddTodos.rejected, (state, action:any) => {
      state.message = action.payload.message
    })
    .addCase(fetchUpdateTodo.fulfilled, (state, action) => {
      state.message = action.payload.message
    })
    .addCase(fetchUpdateTodo.rejected, (state, action:any) => {
      state.message = action.payload.message
    })


  },
});



export const selectTodos = (state: RootState) => state;
export default todoSlice.reducer;