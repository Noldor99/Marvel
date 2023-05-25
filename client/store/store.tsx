import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { heroApi } from "./api/heroApi";
import { filterReducer } from "./slice/filterSlice";
import { heroReducer } from "./slice/heroSlice";


const rootReducer = combineReducers({
  filter: filterReducer,
  hero: heroReducer,
  [heroApi.reducerPath]: heroApi.reducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(heroApi.middleware),
  devTools: true,
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch