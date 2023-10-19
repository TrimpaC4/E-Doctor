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

  export const updatePatient = createAsyncThunk('api/AdminDoc', async (id:number,body:any) => {
    const response = await axios.put(`http://localhost:5000/api/AdminDoc/${id}`,body);
    return response.data;
  });
  

  export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
    //   builder
        // .addCase(getPatient.pending, state => {
        //   state.pending = true;
        // })
        // .addCase(getPatient.fulfilled, (state,action ) => {
        //   state.data = action.payload;
        //   state.pending = false;
        // })
        // .addCase(getPatient.rejected, state => {
        //   state.pending = false;
        //   state.error = true;
        // })
        
        

    }
    }
   
  );
  
  export const selectPatient = (state: RootState) => state.patient;
  
  export default  adminSlice.reducer;