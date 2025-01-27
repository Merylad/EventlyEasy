import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../../app/store";

// Define types for the slice state
export interface NewExpenseI {
    name : string,
    price : number | string
    event_id : string | number
}

export interface ExpenseI extends NewExpenseI {
  id: string | number;
}

interface ExpenseState {
  expenses: ExpenseI[];
  error : string
}

// Define the initial state using the UsersState type
const initialState: ExpenseState = {
expenses : [],
error : ''
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';

export const fetchExpenses = createAsyncThunk('expenses/fetchExpenses',
     async({eventId} : {eventId : string | number}, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiBaseUrl}/api/events/expenses/byevent/${eventId}`)
            return response.data
        } catch (error : any) {
            return rejectWithValue(error.response.data);
        }
     })

export const fetchAddExpense = createAsyncThunk('expenses/fetchAddExpense', async({expense} : {expense : NewExpenseI}, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/api/events/expenses/add`, expense)
      return response.data
    } catch(error : any){
      return rejectWithValue(error.response.data);
    }
})

export const fetchUpdateExpense = createAsyncThunk ('catering/fetchUpdateExpense', async({expense, expenseId} : {expense : NewExpenseI, expenseId : string | number}, {rejectWithValue})=> {
  try {
    const response = await axios.put(`${apiBaseUrl}/api/events/expenses/update/${expenseId}`, expense)
    return response.data

  } catch (error : any) {
    return rejectWithValue(error.response.data);
  }
})

export const fetchDeleteExpense = createAsyncThunk('expense/fetchDeleteExpense', async({expenseId} : {expenseId : string|number}, {rejectWithValue})=>{
  try {
    const response = await axios.delete(`${apiBaseUrl}/api/events/expenses/delete/${expenseId}`)
    return response.data
  } catch (error : any) {
    return rejectWithValue(error.response.data);
  }
})



const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setError : (state, action) => {
      state.error = action.payload
    }
    },
    
  extraReducers: (builder) => {
    builder
    .addCase(fetchExpenses.fulfilled, (state, action)=>{
        state.expenses = action.payload.expenses;
    })
    .addCase(fetchExpenses.rejected, (state, action : any)=>{
      state.error = action.payload.message
  })
    .addCase(fetchAddExpense.rejected, (state, action:any) => {
      state.error = action.payload.message
    })
    .addCase(fetchUpdateExpense.rejected, (state, action:any) => {
      state.error = action.payload.message
    })
    .addCase(fetchDeleteExpense.rejected, (state, action:any) => {
      state.error = action.payload.message
    })


  },
});



export const selectExpense = (state: RootState) => state;
export const {setError} = expenseSlice.actions
export default expenseSlice.reducer;