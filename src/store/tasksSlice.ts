/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { TaskType } from "../types/types";

type TasksState = {
  tasks: TaskType[];
};

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<TaskType>): void {
      const task = action.payload;

      state.tasks = [
        ...state.tasks,
        {
          ...task,
          id: uuidv4(),
          status: "active",
        },
      ];
    },

    completeTask(state, action: PayloadAction<string>): void {
      const taskId = action.payload;

      state.tasks = state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "completed" ? "active" : "completed",
            }
          : task
      );
    },

    deleteTask(state, action: PayloadAction<string>): void {
      const taskId = action.payload;

      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
  },
});

export const tasksActions = tasksSlice.actions;

export default tasksSlice;
