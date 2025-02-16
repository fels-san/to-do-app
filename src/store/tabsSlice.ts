/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TabType } from "../types/types";

type TabsState = {
  selectedTab: TabType;
};

const initialState: TabsState = {
  selectedTab: "all",
};

const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    selectTab(state, action: PayloadAction<TabType>): void {
      const tabName = action.payload;
      state.selectedTab = tabName;
    },
  },
});

export const tabsActions = tabsSlice.actions;

export default tabsSlice;
