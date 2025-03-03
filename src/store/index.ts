import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import themeSlice from "./themeSlice";
import sortSlice from "./sortSlice";
import tabsSlice from "./tabsSlice";
import tasksSlice from "./tasksSlice";

const rootReducer = combineReducers({
  theme: themeSlice.reducer,
  sort: sortSlice.reducer,
  tabs: tabsSlice.reducer,
  tasks: tasksSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["tabs"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
