import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { albumSlice } from "./slices/albumSlice";

export const store = configureStore({
  reducer: {
    album: albumSlice.reducer,
  },

  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({ serializableCheck: false }).concat([]);
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from "./slices/albumSlice";
