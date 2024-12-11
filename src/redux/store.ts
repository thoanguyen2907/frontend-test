import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import productReducer from "./reducers/productsReducer";

const store = configureStore({
    reducer: {
        productReducer
    }
})

export default store

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;