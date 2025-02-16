import { useMemo } from "react";
import { AnimatePresence } from "framer-motion";

import classes from "./TaskList.module.css";

import Task from "./Task";
import TaskTabs from "./TaskTabs";

import { useAppSelector } from "../hooks";

export default function TaskList() {
  const selectedSort = useAppSelector((state) => state.sort.selectedSort);
  const selectedTab = useAppSelector((state) => state.tabs.selectedTab);
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const filteredTasks = useMemo(
    () => ({
      all: [...tasks],
      active: [...tasks].filter((task) => task.status === "active"),
      completed: [...tasks].filter((task) => task.status === "completed"),
    }),
    [tasks]
  );

  const displayedTasks = filteredTasks[selectedTab].sort((a, b) => {
    if (selectedSort.sortName === "deadline") {
      return selectedSort.order === "ascending"
        ? new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
        : new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
    }

    if (selectedSort.sortName === "creation date") {
      return selectedSort.order === "ascending"
        ? new Date(a.creationDate).getTime() -
            new Date(b.creationDate).getTime()
        : new Date(b.creationDate).getTime() -
            new Date(a.creationDate).getTime();
    }

    return 0;
  });

  return (
    <TaskTabs>
      <ul className={classes.taskList}>
        <AnimatePresence>
          {displayedTasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </AnimatePresence>
      </ul>
    </TaskTabs>
  );
}
