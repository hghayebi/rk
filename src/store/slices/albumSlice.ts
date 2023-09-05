import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

export type SizeType = string; //"1:1" | "9:16" | "16:9" | "4:5";

export interface MediaType {
  id: string;
  mediaFile: File;
  fileType: string;
  isApproved: boolean;
  sizeValue: SizeType;
}
export interface AlbumType {
  medias: Array<MediaType>;
  currentMedia: MediaType | null;
  approvedMedias: Array<MediaType>;
  currentSize: SizeType;
}

const initialState: AlbumType = {
  medias: [],
  currentMedia: null,
  approvedMedias: [],
  currentSize: "1:1",
};
export const albumSlice = createSlice({
  name: "Album",
  initialState,
  reducers: {
    addMedia(state, action: PayloadAction<File>) {
      const media = {
        id: nanoid(),
        mediaFile: action.payload,
        fileType: action.payload?.type,
        isApproved: false,
        sizeValue: state.currentSize,
      };
      state.currentMedia = media;
      state.medias.push(media);
    },
    deleteMedia(state, action: PayloadAction<MediaType>) {
      state.medias = state.medias.filter(
        (image) => image.id !== action.payload.id
      );
      state.approvedMedias = state.approvedMedias.filter(
        (image) => image.id !== action.payload.id
      );

      if (state.currentMedia?.id === action.payload.id) {
        state.currentMedia = null;
      }
    },
    setCurrentMedia(state, action: PayloadAction<MediaType | null>) {
      state.currentMedia = action.payload;
    },

    setCurrentSize(state, action: PayloadAction<SizeType>) {
      state.currentSize = action.payload;
    },

    setApprove(state) {
      if (state.currentMedia && !state.currentMedia.isApproved) {
        state.currentMedia.isApproved = true;
        state.approvedMedias.push(state.currentMedia);
        state.medias = state.medias.filter(
          (media) => media.id !== state.currentMedia?.id
        );
        state.currentMedia = null;
      }
    },
  },
});

export const {
  addMedia,
  deleteMedia,
  setCurrentMedia,
  setCurrentSize,
  setApprove,
} = albumSlice.actions;
