import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./itemSlice";
import personReducer from "./personSlice";

export const store = configureStore({
  reducer: {
    items: itemReducer,
    person: personReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
