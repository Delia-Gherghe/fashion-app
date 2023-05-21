import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../redux/basket.slice";

export const store = configureStore({
  reducer: { basketReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
