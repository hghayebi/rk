import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

export interface ImageType {
  id: string;
  imageFile: File;
}
export interface AlbumType {
  images: Array<ImageType>;
  currentImage: ImageType | null;
}

const initialState: AlbumType = {
  images: [],
  currentImage: null,
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
    deleteImage(state, action: PayloadAction<ImageType>) {
      state.images = state.images.filter(
        (image) => image.id !== action.payload.id
      );
    },
    setCurrentImage(state, action: PayloadAction<ImageType>) {
      state.currentImage = action.payload;
    },
  },
});

export const { addImage, deleteImage, setCurrentImage } = albumSlice.actions;
