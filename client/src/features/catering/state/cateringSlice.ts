import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../../app/store";

// Define types for the slice state
export interface NewCateringI {
    name : string,
    cost_per_guest : number,
    additional_fees : number,
    is_final_choice : boolean,
    notes : string,
    event_id : string | number
}

export interface cateringI extends NewCateringI {
  id: string | number;
}

interface CateringState {
  catering: cateringI[];
  error : string
}

// Define the initial state using the UsersState type
const initialState: CateringState = {
catering : [],
error : ''
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';

export const fetchCatering = createAsyncThunk('catering/fetchCatering',
     async({eventId} : {eventId : string | number}, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiBaseUrl}/api/events/catering/byevent/${eventId}`)
            return response.data
        } catch (error : any) {
            return rejectWithValue(error.response.data);
        }
     })

export const fetchAddCatering = createAsyncThunk('catering/fetchAddCatering', async({catering} : {catering : NewCateringI}, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/api/events/catering/add`, catering)
      return response.data
    } catch(error : any){
      return rejectWithValue(error.response.data);
    }
})

export const fetchUpdateCatering = createAsyncThunk ('catering/fetchUpdateCatering', async({catering, cateringId} : {catering : NewCateringI, cateringId : string | number}, {rejectWithValue})=> {
  try {
    const response = await axios.put(`${apiBaseUrl}/api/events/catering/update/${cateringId}`, catering)
    return response.data

  } catch (error : any) {
    return rejectWithValue(error.response.data);
  }
})

export const fetchDeleteCatering = createAsyncThunk('catering/fetchDeleteCatering', async({cateringId} : {cateringId : string|number}, {rejectWithValue})=>{
  try {
    const response = await axios.delete(`${apiBaseUrl}/api/events/catering/delete/${cateringId}`)
    return response.data
  } catch (error : any) {
    return rejectWithValue(error.response.data);
  }
})



const cateringSlice = createSlice({
  name: "catering",
  initialState,
  reducers: {
    setError : (state, action) => {
      state.error = action.payload
    }
    },
    
  extraReducers: (builder) => {
    builder
    .addCase(fetchCatering.fulfilled, (state, action)=>{
        state.catering = action.payload.catering;
    })
    .addCase(fetchCatering.rejected, (state, action : any)=>{
      state.error = action.payload.message
  })
    .addCase(fetchAddCatering.rejected, (state, action:any) => {
      state.error = action.payload.message
    })
    .addCase(fetchUpdateCatering.rejected, (state, action:any) => {
      state.error = action.payload.message
    })
    .addCase(fetchDeleteCatering.rejected, (state, action:any) => {
      state.error = action.payload.message
    })


  },
});



export const selectCatering = (state: RootState) => state;
export const {setError} = cateringSlice.actions
export default cateringSlice.reducer;