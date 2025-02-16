import { configureStore } from "@reduxjs/toolkit";

import themeSlice from "./themeSlice";
import sortSlice from "./sortSlice";
import tabsSlice from "./tabsSlice";
import tasksSlice from "./tasksSlice";

const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    sort: sortSlice.reducer,
    tabs: tabsSlice.reducer,
    tasks: tasksSlice.reducer,
  },
});

export default store;

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
