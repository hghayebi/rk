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
  logoOffset: LogoOffsetType;
  mediaContainerPosition: DOMRect;
  price?: number | null;
  salesMethod?: "exclusive" | "shared" | null;
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
  inSendPage: boolean;
}

const initialState: AlbumType = {
  medias: [],
  currentMedia: null,
  approvedMedias: [],
  currentSize: "1:1",
  mediasList: [],
  currentMediaList: null,
  inSendPage: false,
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
        logoSize: { width: 40, height: 40 },
        logoOffset: { bottom: 1, right: 1 },
        mediaContainerPosition: new DOMRect(),
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
        (media) => media.id !== action.payload.id
      );
      state.approvedMedias = state.approvedMedias.filter(
        (media) => media.id !== action.payload.id
      );

      if (state.currentMedia?.id === action.payload.id) {
        state.currentMedia = null;
      }

      if (state.currentMediaList) {
        state.currentMediaList = {
          id: state.currentMediaList?.id,
          medias: state.currentMediaList?.medias.filter(
            (media) => media.id !== action.payload.id
          ),
        };

        state.mediasList = state.mediasList.filter(
          (mediaList) => mediaList.id !== state.currentMediaList?.id
        );
        state.mediasList.push(state.currentMediaList);
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
      if (state.currentMedia) state.currentMedia = { ...state.currentMedia };
    },

    setApprove(state) {
      if (state.medias.length !== 0) {
        const mediaAt1by1 = state.medias.find(
          (media) => media.sizeValue === "1:1"
        );

        const mediaAt9by16 = state.medias.find(
          (media) => media.sizeValue === "9:16"
        );
        const mediaAt16by9 = state.medias.find(
          (media) => media.sizeValue === "16:9"
        );
        const mediaAt4by5 = state.medias.find(
          (media) => media.sizeValue === "4:5"
        );

        // Return if any media have isApproved to true and clear  -->

        // Return if any media have isApproved to true and clear  <--

        if (mediaAt1by1) {
          if (mediaAt1by1?.isApproved) {
            state.medias = [];
            state.currentMedia = null;
            state.currentMediaList = null;
            return;
          }
          mediaAt1by1.isApproved = true;
          state.mediasList = state.mediasList.filter(
            (m) => m.id !== state.currentMediaList?.id
          );

          state.approvedMedias.push(mediaAt1by1);
          state.approvedMedias = state.approvedMedias.filter(
            (media) =>
              media.id !==
              (mediaAt9by16?.id || mediaAt16by9?.id || mediaAt4by5?.id)
          );
          state.currentMediaList = { id: mediaAt1by1.id, medias: [] };
          mediaAt9by16 ? (mediaAt9by16.isApproved = false) : null;
          mediaAt16by9 ? (mediaAt16by9.isApproved = false) : null;
          mediaAt4by5 ? (mediaAt4by5.isApproved = false) : null;
        } else if (mediaAt9by16) {
          if (mediaAt9by16?.isApproved) {
            state.medias = [];
            state.currentMedia = null;
            state.currentMediaList = null;
            return;
          }
          state.mediasList = state.mediasList.filter(
            (m) => m.id !== state.currentMediaList?.id
          );
          mediaAt9by16.isApproved = true;
          state.approvedMedias.push(mediaAt9by16);
          state.approvedMedias = state.approvedMedias.filter(
            (media) => media.id !== (mediaAt16by9?.id || mediaAt4by5?.id)
          );
          state.currentMediaList = { id: mediaAt9by16.id, medias: [] };
          mediaAt16by9 ? (mediaAt16by9.isApproved = false) : null;
          mediaAt4by5 ? (mediaAt4by5.isApproved = false) : null;
        } else if (mediaAt16by9) {
          if (mediaAt16by9?.isApproved) {
            state.medias = [];
            state.currentMedia = null;
            state.currentMediaList = null;
            return;
          }
          state.mediasList = state.mediasList.filter(
            (m) => m.id !== state.currentMediaList?.id
          );
          mediaAt16by9.isApproved = true;
          state.approvedMedias.push(mediaAt16by9);
          state.approvedMedias = state.approvedMedias.filter(
            (media) => media.id !== mediaAt4by5?.id
          );
          state.currentMediaList = { id: mediaAt16by9.id, medias: [] };
          mediaAt4by5 ? (mediaAt4by5.isApproved = false) : null;
        } else if (mediaAt4by5) {
          if (mediaAt4by5?.isApproved) {
            state.medias = [];
            state.currentMedia = null;
            state.currentMediaList = null;
            return;
          }
          state.mediasList = state.mediasList.filter(
            (m) => m.id !== state.currentMediaList?.id
          );
          mediaAt4by5.isApproved = true;
          state.approvedMedias.push(mediaAt4by5);
          state.currentMediaList = { id: mediaAt4by5.id, medias: [] };
        }

        if (mediaAt1by1) {
          state.currentMediaList?.medias.push(mediaAt1by1);
        }

        if (mediaAt9by16) {
          state.currentMediaList?.medias.push(mediaAt9by16);
        }

        if (mediaAt16by9) {
          state.currentMediaList?.medias.push(mediaAt16by9);
        }

        if (mediaAt4by5) {
          state.currentMediaList?.medias.push(mediaAt4by5);
        }

        if (state.currentMediaList) {
          state.mediasList = state.mediasList.filter(
            (m) => m.id !== state.currentMediaList?.id
          );
          state.mediasList.push(state.currentMediaList);
        }
        state.currentMediaList = null;
        state.medias = [];
        state.currentMedia = null;
        state.approvedMedias = state.approvedMedias.filter(
          (media) => media.isApproved
        );
        let ids = state.approvedMedias.map((media) => media.id);
        ids = [...new Set(ids)];

        const arr: MediaType[] = [];
        ids.forEach((id) => {
          const m = state.approvedMedias.find((media) => media.id === id);
          if (m) arr.push(m);
        });
        state.approvedMedias = arr;
      }
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
        state.approvedMedias = state.approvedMedias.map((media) => {
          if (media.id === state.currentMedia?.id) {
            return {
              ...state.currentMedia,
              logoSize: action.payload,
            };
          }
          return media;
        });

        if (state.currentMediaList) {
          state.currentMediaList.medias = state.medias;
          state.mediasList = state.mediasList.filter(
            (mediaList) => mediaList.id !== state.currentMediaList?.id
          );
          state.mediasList.push(state.currentMediaList);
        }

        // if (state.currentMediaList) {
        //   state.currentMediaList.medias = state.medias;
        // }
        // if (state.currentMediaList)
        //   state.currentMediaList.medias = state.medias;
        // state.mediasList = state.mediasList.map((mediaList) => {
        //   const media: MediaType | undefined = mediaList.medias.find(
        //     (media) => media.id === state.currentMedia?.id
        //   );
        //   if (media) {
        //     const mL: MediaList = {
        //       id: mediaList.id,
        //       medias: mediaList.medias.map((m: MediaType) => {
        //         if (m.id === media.id) return state.currentMedia;
        //         return m;
        //       }),
        //     };
        //     return mL;
        //   }
        //   return mediaList;
        // });
      }
    },
    setLogoOffset(state, action: PayloadAction<DOMRect>) {
      if (state.currentMedia) {
        state.medias = state.medias.filter(
          (media) => media.id !== state.currentMedia?.id
        );
        console.log("in store bottom:");
        console.log(
          state.currentMedia.mediaContainerPosition?.bottom -
            action.payload.bottom
        );
        console.log("in store right:");
        console.log(
          state.currentMedia.mediaContainerPosition?.right -
            action.payload.right
        );
        // (state.currentMedia.logoOffset = {
        //   bottom:
        //     state.currentMedia.mediaContainerPosition?.bottom -
        //     action.payload.bottom,

        //   right:
        //     state.currentMedia.mediaContainerPosition?.right -
        //     action.payload.right,
        // }),
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
        // state.currentMedia = { ...state.currentMedia };
        // console.log(state.currentMedia.logoOffset.bottom);
        // console.log(state.currentMedia.logoOffset.right);

        // n
        state.approvedMedias = state.approvedMedias.map((media) => {
          if (media.id === state.currentMedia?.id) {
            return {
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
          }
          return media;
        });

        if (state.currentMediaList) {
          state.currentMediaList.medias = state.medias;
          state.mediasList = state.mediasList.filter(
            (mediaList) => mediaList.id !== state.currentMediaList?.id
          );
          state.mediasList.push(state.currentMediaList);
        }
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
    setInSendPage(state, action: PayloadAction<boolean>) {
      state.inSendPage = action.payload;
    },

    setPrice(state, action: PayloadAction<number | null>) {
      if (state.currentMedia) {
        // state.currentMedia.price = action.payload;

        state.approvedMedias = state.approvedMedias.map((media) => {
          if (media.id === state.currentMedia?.id) {
            const m = state.currentMedia;
            m.price = action.payload;
            return m;
          }

          return media;
        });
        // if (state.currentMediaList) {
        //   state.currentMediaList = {
        //     id: state.currentMediaList.id,
        //     medias: state.currentMediaList?.medias.map((media) => {
        //       if (media.id === state.currentMedia?.id)
        //         return state.currentMedia;
        //       return media;
        //     }),
        //   };

        //   state.mediasList = state.mediasList.map((mediaList) => {
        //     if (mediaList.id === state.currentMediaList?.id)
        //       return state.currentMediaList;
        //     return mediaList;
        //   });
        // }
      }
    },

    setSalesMethod(
      state,
      action: PayloadAction<"exclusive" | "shared" | null | undefined>
    ) {
      if (state.currentMedia) {
        state.approvedMedias = state.approvedMedias.map((media) => {
          if (media.id === state.currentMedia?.id) {
            const m = state.currentMedia;
            m.salesMethod = action.payload;
            return m;
          }
          return media;
        });
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
  setInSendPage,
  setPrice,
  setSalesMethod,
} = albumSlice.actions;
