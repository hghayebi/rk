import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { albumSlice } from "./slices/albumSlice";
import { imageRatioSlice } from "./slices/imageRatioSlice";

export const store = configureStore({
  reducer: {
    album: albumSlice.reducer,
    ratio: imageRatioSlice.reducer,
  },

  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({ serializableCheck: false }).concat([]);
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from "./slices/albumSlice";
export * from "./slices/imageRatioSlice";
