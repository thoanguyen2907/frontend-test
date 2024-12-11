import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import productReducer from "./reducers/productsReducer";
import productDetailReducer from "./reducers/productDetailReducer";

const store = configureStore({
    reducer: {
        productReducer, 
        productDetailReducer
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