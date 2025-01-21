import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../../app/store";

// Define types for the slice state
export interface Event {
  id: string | number;
  user_id : string|number
  name : string
  date : Date 
}

interface EventsState {
  events: Event[];
  message : string
}

// Define the initial state using the UsersState type
const initialState: EventsState = {
events : [],
message : 'Hello'
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async ({id}: {id:string | number }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiBaseUrl}/api/events/users/${id}`,
    );
      return response.data; 
    } catch (error : any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAddEvents = createAsyncThunk(
    'events/fetchAddEvents',
    async ({userId, name, date}: {userId:string | number, name:string, date:string | Date }, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${apiBaseUrl}/api/events/addevent/`,
          {userId, name, date}
      );
        return response.data; 
      } catch (error : any) {
        return rejectWithValue(error.response.data);
      }
    }
  );

export const fetchDeleteEvent = createAsyncThunk (
    'events/fetchDeleteEvent',
    async({eventId} : {eventId : string|number}, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${apiBaseUrl}/api/events/delete/${eventId}`)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const fetchUpdateEvent = createAsyncThunk (
  'events/fetchUpdateEvent',
  async({eventId, name, date} : {eventId : string|number, name : string, date : string|Date}, {rejectWithValue}) => {
      try {
          const response = await axios.put(`${apiBaseUrl}/api/events/update/${eventId}`,
            {name, date}
          )
          return response.data
      } catch (error: any) {
          return rejectWithValue(error.response.data);
      }
  }
)



const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {

    },
    
  extraReducers: (builder) => {
    builder
   .addCase(fetchEvents.fulfilled, (state, action) => {
    state.events = action.payload
   })
   .addCase(fetchAddEvents.fulfilled, (state, action) => {
    state.message = action.payload.message
})
.addCase(fetchDeleteEvent.fulfilled, (state, action) => {
    state.message = action.payload.message
})
.addCase(fetchUpdateEvent.fulfilled, (state, action) => {
  state.message = action.payload.message
})
  },
});



export const selectEvents = (state: RootState) => state;
export default eventsSlice.reducer;