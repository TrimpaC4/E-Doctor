import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface doctorType {
  id: number;
  name: string;
  avatarUrl: string;
  department: string;
  isVerified: boolean,
  email:string,
  address:string,
  phone:number,
  cin: number,
  age: number,
}

interface doctorType2 {
  doctorId: any;
  isVerified: boolean
}
interface DoctorState {
  doctorInfo: Object;
  userRegistred: string;
  loading: boolean;
  errors: string;
  message: string | null;
  token: string;
  isAuthenticated: boolean;
  type: string;
  allDoctors: Array<doctorType>;
  allReviwes: Array<Object>;
}

const initialState: DoctorState = {
  doctorInfo: {},
  userRegistred: "",
  loading: false,
  errors: "",
  message: null,
  token: "",
  isAuthenticated: false,
  type: "doctor",
  allDoctors: [],
  allReviwes: [],
};

export const createDoctor = createAsyncThunk(
  "createDoctor",
  async (body: Object) => {
    try {
      const data = await axios.post(
        "http://localhost:5000/api/doctor/register",
        body
      );
      return data.data;
    } catch (error) {
      return error;
    }
  }
);

export const getOneDoctor = createAsyncThunk("getOneDoctor", async () => {
  try {
    const token = localStorage.getItem("token");
    const data = await axios.get("http://localhost:5000/api/doctor/getOne", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } catch (error) {
    return error;
  }
});

export const doctorLogin = createAsyncThunk(
  "doctorLogin",
  async (body: Object) => {
    try {
      const data = await axios.post(
        "http://localhost:5000/api/doctor/login",
        body
      );
      return data.data;
    } catch (error) {
      return error;
    }
  }
);

export const getAllDoctors = createAsyncThunk("getAllDoctors", async () => {
  try {
    const data = await axios.get("http://localhost:5000/api/doctor/getAll");
    return data.data;
  } catch (error) {
    return error;
  }
});

export const getReviewsByDocId = createAsyncThunk(
  "getReviewsByDocId",
  async (id: number) => {
    try {
      const data = await axios.get(
        `http://localhost:5000/api/review/getAll/${id}`
      );
      return data.data;
    } catch (error) {
      return error;
    }
  }
);
export const removeDoctor = createAsyncThunk('api/doctor', async (id:number,{dispatch})=>{
  try {console.log('this is id', id);

   const response = await axios.delete(`http://localhost:5000/api/doctor/${id}`)
 return (await (dispatch(getAllDoctors()))).payload
 }
  catch(error) {
   console.log(error);

  }
 });

 export const updateDoctorVerification = createAsyncThunk(
  'doctor/updateDoctorVerification',
  async (args:doctorType2,{dispatch}) => {
    const { doctorId, isVerified } = args;
    try {
      const response = await axios.put(`http://127.0.0.1:5000/api/doctor/${doctorId}`, { isVerified });
      return (await (dispatch(getAllDoctors()))).payload
      ;
    } catch (error) {
      console.log(error);
    }
  }
);

const doctorSlice = createSlice({
  name: "DoctorSlice",
  initialState,
  reducers: {
    logoutDoctor: (state) => {
      state.loading = false;
      state.errors = "";
      state.doctorInfo = {};
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("type");
    },
  },
  extraReducers(builder) {
    builder.addCase(createDoctor.fulfilled, (state, action) => {
      state.loading = false;
      state.errors = "";
      state.message = action.payload.message;
    });
    builder.addCase(createDoctor.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(doctorLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.errors = "";
      state.message = action.payload.message;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("type", "doctor");
    });
    builder.addCase(getOneDoctor.fulfilled, (state, action) => {
      state.loading = false;
      state.errors = "";
      state.doctorInfo = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(getAllDoctors.fulfilled, (state, action) => {
      state.allDoctors = action.payload;
    });
    builder.addCase(getReviewsByDocId.fulfilled, (state, action) => {
      state.allReviwes = action.payload;
    });
  },
});

export const { logoutDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;