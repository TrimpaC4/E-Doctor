import { configureStore } from "@reduxjs/toolkit";
import doctorReducer from "./doctorSlice";
import patientReducer from "./patientSlice";

const rootReducer = {
  doctor: doctorReducer,
  patient: patientReducer,
  // add more reducers here
};

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;