import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RatioType {
  label: string;
  value: string;
  haveContent: boolean;
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
    setRatios(state, action: PayloadAction<Array<RatioType>>) {
      state.ratios = action.payload;
    },
  },
});

export const { setCurrentRatio, setRatios } = imageRatioSlice.actions;
