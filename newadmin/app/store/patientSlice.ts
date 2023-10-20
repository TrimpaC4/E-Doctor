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
  });

  export const removePatient = createAsyncThunk('api/patient', async (id:number,{dispatch})=>{  
   try {console.log('this is id', id);
  
    const response = await axios.delete(`http://localhost:5000/api/patient/${id}`); 
  return (await (dispatch(getPatient()))).payload
  }
   catch(error) {
    console.log(error);
    
   }
  });
  

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
        .addCase(getPatient.fulfilled, (state,action ) => {
          state.data = action.payload;
          state.pending = false;
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
