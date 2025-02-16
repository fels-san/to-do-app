/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { SortType } from "../types/types";

type SortState = {
  selectedSort: SortType;
};

const initialState: SortState = {
  selectedSort: {
    sortName: "deadline",
    order: "ascending",
  },
};

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    selectSort(state, action: PayloadAction<SortType>): void {
      const sort = action.payload;
      state.selectedSort = sort;
    },
  },
});

export const sortActions = sortSlice.actions;

export default sortSlice;
