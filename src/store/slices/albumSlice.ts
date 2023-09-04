import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import getCurrentImageIndex from "../../utils/getCurrentImageIndex";

export interface MediaType {
  id: string;
  mediaFile: File;
  fileType: string;
}
export interface AlbumType {
  medias: Array<MediaType>;
  currentMedia: MediaType | null;
}

const initialState: AlbumType = {
  medias: [],
  currentMedia: null,
};
export const albumSlice = createSlice({
  name: "Album",
  initialState,
  reducers: {
    addMedia(state, action: PayloadAction<Array<File>>) {
      const arr = action.payload.map((item) => ({
        id: nanoid(),
        mediaFile: item,
        fileType: item.type,
      }));
      state.medias.push(...arr);
    },
    deleteMedia(state, action: PayloadAction<MediaType>) {
      if (action.payload.id === state.currentMedia?.id) {
        let index: number = getCurrentImageIndex(action.payload, state.medias);
        if (index === state.medias.length - 1) index = -1;
        state.currentMedia = state.medias[index + 1];
      }
      state.medias = state.medias.filter(
        (image) => image.id !== action.payload.id
      );
    },
    setCurrentMedia(state, action: PayloadAction<MediaType | null>) {
      state.currentMedia = action.payload;
    },
  },
});

export const { addMedia, deleteMedia, setCurrentMedia } = albumSlice.actions;
