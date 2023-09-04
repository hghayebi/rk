import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RatioType {
  label: string;
  vlaue: string;
}

export interface RatioSlice {
  ratios: Array<RatioType>;
  currentRatio: RatioType | null;
}

const initialState: RatioSlice = {
  ratios: [],
  currentRatio: null,
};

export const imageRatioSlice = createSlice({
  name: "ratio",
  initialState,
  reducers: {
    setCurrentRatio(state, action: PayloadAction<RatioType>) {
      state.currentRatio = action.payload;
    },
  },
});

export const { setCurrentRatio } = imageRatioSlice.actions;
