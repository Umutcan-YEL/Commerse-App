import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/ProductSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
