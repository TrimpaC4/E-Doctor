import {
    createSlice,
    PayloadAction,
    createAsyncThunk,
  } from '@reduxjs/toolkit';
  import axios from 'axios';
  import type { RootState } from './index.ts'; 

  export type KanyeState = {
    data: Array<any>;
    pending: boolean;
    error: boolean;
  };

  const initialState: KanyeState = {
    data: [],
    pending: false,
    error: false,
  };

  export const getPatient = createAsyncThunk('api/patient', async () => {
    const response = await axios.get('http://localhost:5000/api/patient/getAll');
  
    return response.data;
  });

   export const addPatient = createAsyncThunk('api/patient', async (body:any) => {
    const response = await axios.post('http://localhost:5000/api/patient/register',body);
    return response.data;
  })
  
  export const patientSlice = createSlice({
    name: 'patient',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
      builder
        .addCase(getPatient.pending, state => {
          state.pending = true;
        })
        .addCase(getPatient.fulfilled, (state, { payload }) => {
          state.pending = false;
          state.data = payload;
        })
        .addCase(getPatient.rejected, state => {
          state.pending = false;
          state.error = true;
        })
        
        

    }
    }
   
  );
  
  export const selectPatient = (state: RootState) => state.patient;
  
  export default  patientSlice.reducer;
