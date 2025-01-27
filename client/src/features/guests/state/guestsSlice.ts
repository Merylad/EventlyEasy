import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../../app/store";

// Define types for the slice state
export interface NewGuestI {
    name : string,
    email : string,
    is_attending : boolean,
    event_id : string | number
}

export interface GuestI extends NewGuestI {
  id: string | number;
}

interface GuestState {
  guests: GuestI[];
  error : string,
  statusForGuest: boolean
}

// Define the initial state using the UsersState type
const initialState: GuestState = {
guests : [],
error : '',
statusForGuest:false
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';

export const fetchGuests = createAsyncThunk('guests/fetchGuests',
     async({eventId} : {eventId : string | number}, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiBaseUrl}/api/events/guests/byevent/${eventId}`)
            return response.data
        } catch (error : any) {
            return rejectWithValue(error.response.data);
        }
     })

export const fetchAddGuests = createAsyncThunk('guests/addGuests', async({guest} : {guest : NewGuestI}, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/api/events/guests/add`, guest)
      return response.data
    } catch(error : any){
      return rejectWithValue(error.response.data);
    }
})

export const fetchUpdateGuest = createAsyncThunk ('guests/fetchUpdateGuests', async({guest, guestId} : {guest : NewGuestI, guestId : string | number}, {rejectWithValue})=> {
  try {
    const response = await axios.put(`${apiBaseUrl}/api/events/guests/update/${guestId}`, guest)
    return response.data

  } catch (error : any) {
    return rejectWithValue(error.response.data);
  }
})

export const fetchToggleGuest = createAsyncThunk('guests/fetchToggleGuest', async({guestId} : {guestId : string | number}, {rejectWithValue} )=>{
  try {
    const response = await axios.put(`${apiBaseUrl}/api/events/guests/toggle/${guestId}`)
    return response.data
  } catch (error : any) {
    return rejectWithValue(error.response.data);
  }
})

export const fetchDeleteGuest = createAsyncThunk('guests/fetchDeleteGuests', async({guestId} : {guestId : string|number}, {rejectWithValue})=>{
  try {
    const response = await axios.delete(`${apiBaseUrl}/api/events/guests/delete/${guestId}`)
    return response.data
  } catch (error : any) {
    return rejectWithValue(error.response.data);
  }
})



const guestSlice = createSlice({
  name: "guests",
  initialState,
  reducers: {
    setError : (state, action) => {
      state.error = action.payload
    },

    setStatusForGuest : (state, action) => {
      state.error = action.payload
    }
  },
    
  extraReducers: (builder) => {
    builder
    .addCase(fetchGuests.fulfilled, (state, action)=>{
      // state.error = ''
        state.guests = [...action.payload.guests];
    })
    .addCase(fetchGuests.rejected, (state, action : any)=>{
      state.error = action.payload.message
  })
    .addCase(fetchAddGuests.rejected, (state, action:any) => {
      state.error = action.payload.message
      state.statusForGuest = true
    })
    .addCase(fetchUpdateGuest.rejected, (state, action:any) => {
      state.error = action.payload.message
      state.statusForGuest = true
    })
    .addCase(fetchToggleGuest.rejected, (state, action:any) => {
      state.error = action.payload.message
    })
    .addCase(fetchDeleteGuest.rejected, (state, action:any) => {
      state.error = action.payload.message
    })
    .addCase(fetchUpdateGuest.fulfilled, (state, action)=>{
      state.statusForGuest = false
    })
    .addCase(fetchAddGuests.fulfilled, (state, action)=>{
      state.statusForGuest = false
    })
  },
});



export const selectGuests = (state: RootState) => state;
export const {setError, setStatusForGuest} = guestSlice.actions
export default guestSlice.reducer;