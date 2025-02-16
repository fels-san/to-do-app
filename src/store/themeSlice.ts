/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

type ThemeState = {
  theme: "light" | "dark";
};

const initialState: ThemeState = {
  theme: "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state): void {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
});

export const themeActions = themeSlice.actions;

export default themeSlice;
