import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { TaskType } from "../types/types";

import classes from "./Task.module.css";
import TrashIcon from "../ui/icons/TrashIcon";
import SquareCheckIcon from "../ui/icons/SquareCheckIcon";
import SquareXIcon from "../ui/icons/SqueareXIcon";
import ChevronIcon from "../ui/icons/ChevronIcon";

import { useAppDispatch, useAppSelector } from "../hooks";
import { tasksActions } from "../store/tasksSlice";

type TaskProps = { task: TaskType };

export default function Task({ task }: TaskProps) {
  const theme = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const formattedDate = new Date(task.deadline).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const isExpired = (deadlineStr: string): boolean => {
    const deadline = new Date(deadlineStr);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);

    return deadline < today;
  };

  const taskStatusClass: string =
    task.status === "active" ? classes.current : classes.completed;
  const isTaskExpiredClass = isExpired(task.deadline)
    ? classes.expired
    : classes.upcoming;

  function handleViewDetails() {
    setIsExpanded(!isExpanded);
  }

  function handleCompleteTask(taskId: string) {
    dispatch(tasksActions.completeTask(taskId));
  }

  function handleDeleteTask(taskId: string) {
    dispatch(tasksActions.deleteTask(taskId));
  }

  return (
    <motion.li
      layout
      exit={{ y: -10, opacity: 0 }}
      className={`${classes.task} ${taskStatusClass} ${isTaskExpiredClass} ${classes[theme]}`}
      key={task.id}
    >
      <article>
        <header className={classes.header}>
          <div className={classes.info}>
            <h2>{task.text}</h2>
            <p>{`${
              isExpired(task.deadline) ? "Expired" : "Complete until"
            } ${formattedDate}`}</p>
          </div>
          <div className={classes.buttons}>
            <motion.button
              className={`${classes.button}`}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.5 }}
              type="button"
              title={`mark as ${
                task.status === "active" ? "completed" : "active"
              }`}
              onClick={() => handleCompleteTask(task.id)}
            >
              {task.status === "active" ? <SquareCheckIcon /> : <SquareXIcon />}
            </motion.button>
            <motion.button
              className={`${classes.button}`}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.5 }}
              type="button"
              title="delete"
              onClick={() => handleDeleteTask(task.id)}
            >
              <TrashIcon />
            </motion.button>
            <motion.button
              className={`${classes.button}`}
              whileHover={{ scale: 1.15 }}
              animate={{ rotate: isExpanded ? 90 : 0 }}
              type="button"
              title={isExpanded ? "close" : "open"}
              onClick={handleViewDetails}
            >
              <ChevronIcon />
            </motion.button>
          </div>
        </header>
        <div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                key="details"
                style={{ overflow: "hidden" }}
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                transition={{ duration: 0.5 }}
                exit={{ height: 0 }}
                className={`${classes.details}`}
              >
                <p>{task.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </article>
    </motion.li>
  );
}
