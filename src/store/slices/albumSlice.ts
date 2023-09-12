import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

export type SizeType = string; //"1:1" | "9:16" | "16:9" | "4:5";
export type LogoSizeType = { width: number; height: number };
export type LogoOffsetType = { bottom: number; right: number };
export interface MediaType {
  id: string;
  mediaFile: File;
  fileType: string;
  isApproved: boolean;
  sizeValue: SizeType;
  logoSize: LogoSizeType;
  logoOffset?: LogoOffsetType;
  mediaContainerPosition?: DOMRect;
}

export interface MediaList {
  id: string;
  medias: Array<MediaType>;
}
export interface AlbumType {
  medias: Array<MediaType>;
  currentMedia: MediaType | null;
  approvedMedias: Array<MediaType>;
  currentSize: SizeType;
  mediasList: Array<MediaList>;
  currentMediaList: MediaList | null;
}

const initialState: AlbumType = {
  medias: [],
  currentMedia: null,
  approvedMedias: [],
  currentSize: "1:1",
  mediasList: [],
  currentMediaList: null,
};
export const albumSlice = createSlice({
  name: "Album",
  initialState,
  reducers: {
    addMedia(state, action: PayloadAction<File>) {
      const media: MediaType = {
        id: nanoid(),
        mediaFile: action.payload,
        fileType: action.payload?.type,
        isApproved: false,
        sizeValue: state.currentSize,
        logoSize: { width: 20, height: 20 },
        // logoOffset: { bottom: 1, right: 1 },
      };

      state.currentMedia = media;
      state.medias.push(media);
      if (state.currentMediaList) {
        state.currentMediaList.medias.push(media);
        state.medias = state.currentMediaList.medias;
        state.mediasList = state.mediasList.map((mediaList) => {
          if (mediaList.id === state.currentMediaList?.id) {
            return state.currentMediaList;
          }
          return mediaList;
        });
      }
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
      // const media = action.payload;
      const isApprovedMedia = state.approvedMedias.find(
        (m) => m.id === action.payload.id
      )
        ? true
        : false;
      if (!isApprovedMedia && state.currentMediaList) {
        state.mediasList = state.mediasList.filter(
          (m) => m.id !== state.currentMediaList?.id
        );
        state.currentMediaList = {
          id: state.currentMediaList?.id,
          medias: state.medias,
        };
        state.mediasList.push(state.currentMediaList);
      } else if (isApprovedMedia && state.currentMediaList) {
        state.mediasList.filter((m) => m.id !== state.currentMediaList?.id);
        state.currentMediaList = null;
      }
    },
    setCurrentMedia(state, action: PayloadAction<MediaType | null>) {
      state.currentMedia = action.payload;
      if (!action.payload) return;
      else if (action.payload) {
        state.approvedMedias.map((m) => {
          if (m.id === state.currentMedia?.id) {
            state.currentMedia = { ...state.currentMedia, isApproved: true };
            return;
          }
        });
        let tempMediaListId = "";
        state.mediasList.forEach((mediaList) => {
          if (tempMediaListId) return;
          mediaList.medias.forEach((media) => {
            if (media.id === action.payload?.id) {
              tempMediaListId = mediaList.id;
              return;
            }
          });
        });

        state.currentMediaList =
          state.mediasList.find(
            (mediaList) => mediaList.id === tempMediaListId
          ) || null;
        if (state.currentMediaList) {
          state.medias = [...state.currentMediaList.medias];
        }
      }
    },

    setCurrentSize(state, action: PayloadAction<SizeType>) {
      state.currentSize = action.payload;
    },

    setApprove(state) {
      const b = state.approvedMedias.find(
        (m) => m.id === state.currentMedia?.id
      )
        ? false
        : true;
      if (state.currentMedia && b) {
        state.currentMedia.isApproved = true;
        state.approvedMedias.push(state.currentMedia);

        state.medias = state.medias.filter(
          (media) => media.id !== state.currentMedia?.id
        );
        state.medias.push(state.currentMedia);
        state.currentMediaList = { id: nanoid(), medias: state.medias };
        state.mediasList.push(state.currentMediaList);
        state.currentMediaList = null;
        state.medias = [];

        state.currentMedia = null;
      }

      state.medias = state.medias.map((media) => {
        state.approvedMedias.map((m) => {
          if (m.id === media.id) {
            media.isApproved = true;
          }
        });
        return media;
      });
    },

    setCurrentMediaListNull(state, action: PayloadAction<MediaType>) {
      let tempMediaListId = "";
      state.mediasList.forEach((mediaList) => {
        if (tempMediaListId) return;
        mediaList.medias.forEach((media) => {
          if (media.id === action.payload.id && media.isApproved) {
            tempMediaListId = mediaList.id;
            return;
          }
        });
      });
      // --------------------------

      if (
        state.currentMediaList &&
        state.currentMediaList.id === tempMediaListId
      ) {
        state.mediasList = state.mediasList.filter(
          (m) => m.id !== tempMediaListId
        );
        state.currentMediaList = null;
        state.medias = [];
      } else {
        state.mediasList = state.mediasList.filter(
          (m) => m.id !== tempMediaListId
        );
      }
    },

    setLogoSize(state, action: PayloadAction<LogoSizeType>) {
      if (state.currentMedia) {
        state.medias = state.medias.filter(
          (media) => media.id !== state.currentMedia?.id
        );
        state.currentMedia = {
          ...state.currentMedia,
          logoSize: action.payload,
        };
        state.medias.push(state.currentMedia);
      }
    },
    setLogoOffset(state, action: PayloadAction<DOMRect>) {
      if (state.currentMedia) {
        state.medias = state.medias.filter(
          (media) => media.id !== state.currentMedia?.id
        );
        state.currentMedia = {
          ...state.currentMedia,
          logoOffset: {
            bottom:
              state.currentMedia.mediaContainerPosition?.bottom -
              action.payload.bottom,

            right:
              state.currentMedia.mediaContainerPosition?.right -
              action.payload.right,
          },
        };
        state.medias.push(state.currentMedia);
        state.currentMedia = { ...state.currentMedia };
      }
    },

    setMediaContainerPosition(state, action: PayloadAction<DOMRect>) {
      if (state.currentMedia) {
        state.medias = state.medias.filter(
          (media) => media.id !== state.currentMedia?.id
        );

        state.currentMedia = {
          ...state.currentMedia,
          mediaContainerPosition: action.payload,
        };
        state.medias.push(state.currentMedia);
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
  setCurrentMediaListNull,
  setLogoOffset,
  setLogoSize,
  setMediaContainerPosition,
} = albumSlice.actions;
