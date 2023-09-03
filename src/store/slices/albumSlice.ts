import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

export interface ImageType {
  id: string;
  imageFile: File;
}
export interface AlbumType {
  images: Array<ImageType>;
}

const initialState: AlbumType = {
  images: [],
};
export const albumSlice = createSlice({
  name: "Album",
  initialState,
  reducers: {
    addImage(state, action: PayloadAction<Array<File>>) {
      const arr = action.payload.map((item) => ({
        id: nanoid(),
        imageFile: item,
      }));
      state.images.push(...arr);
    },
  },
});

export const { addImage } = albumSlice.actions;
