import { configureStore } from "@reduxjs/toolkit";

import favoritesReducer from "./favorites";

export const store = configureStore({
  reducer: {
    favoriteRecipes: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
