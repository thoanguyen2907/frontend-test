import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import productReducer from "./reducers/productsReducer";
import socketReducer from "./reducers/socketsReducer";

export const createStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      productReducer,
      socketReducer
    },
    preloadedState: initialState,
  });
};
export const store = createStore(); 

export default store

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;