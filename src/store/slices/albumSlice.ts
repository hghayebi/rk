import { createSlice, nanoid } from "@reduxjs/toolkit";

export const albumSlice = createSlice({
  name: "Album",
  initialState: {
    images: [],
  },
  reducers: {
    addImage(state, action) {
      const arr = action.payload.map((item) => ({
        id: nanoid(),
        imageStr: item,
      }));
      state.images.push(...arr);
    },
  },
});

export const { addImage } = albumSlice.actions;
