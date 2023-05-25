import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface filterSliceProps {
  searchValue: string,
  currentPage: number
}

const initialState: filterSliceProps = {
  searchValue: '',
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchValueAction: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
      state.currentPage = 1;
    },
    setCurrentPageAction: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});


export const {
  setSearchValueAction,
  setCurrentPageAction,
} = filterSlice.actions;

export const filterReducer = filterSlice.reducer

