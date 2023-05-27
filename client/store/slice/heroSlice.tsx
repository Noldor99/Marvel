import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHero } from "@/model";
import { heroApi } from "../api/heroApi";



interface heroSliceProps {
  heroes: IHero[] | [];
  totalPage: number;
}

const initialState: heroSliceProps = {
  heroes: [],
  totalPage: 2,
};

const heroSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    setHeroes: (state, action: PayloadAction<IHero[]>) => {
      state.heroes = action.payload;
    },
    setTotalPage: (state, action: PayloadAction<number>) => {
      state.totalPage = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(heroApi.endpoints.getHeroes.matchFulfilled, (state, { payload }: PayloadAction<IHero[]>) => {
        state.heroes = payload;
        state.totalPage = +Math.ceil(payload.length / 4);
      })
  },
});

export const { setHeroes, setTotalPage } = heroSlice.actions;
export const heroReducer = heroSlice.reducer;
