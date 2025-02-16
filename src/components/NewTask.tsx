import { FormEvent } from "react";
import { useAnimate, stagger } from "framer-motion";

import classes from "./NewTask.module.css";

import { TaskType } from "../types/types";

import Modal from "./Modal";

import { useAppDispatch } from "../hooks";
import { tasksActions } from "../store/tasksSlice";

type NewTaskProps = { onDone: () => void };

export default function NewTask({ onDone }: NewTaskProps) {
  const [scope, animate] = useAnimate();
  const dispatch = useAppDispatch();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const deadline = formData.get("deadline") as string;

    if (!title.trim() || !description.trim() || !deadline.trim()) {
      animate(
        "input, textarea",
        { x: [-10, 0, 10, 0] },
        { type: "spring", duration: 0.2, delay: stagger(0.05) }
      );
      return;
    }

    const newTask: TaskType = {
      id: title,
      text: title,
      description,
      creationDate: new Date().toISOString(),
      deadline,
      status: "active",
    };

    onDone();

    dispatch(tasksActions.addTask(newTask));
  }

  return (
    <Modal title="New Task" onClose={onDone}>
      <form
        className={classes.newTask}
        onSubmit={handleSubmit}
        ref={scope}
        autoComplete="off"
      >
        <div>
          <label htmlFor="title">
            Title
            <input type="text" name="title" id="title" />
          </label>
        </div>

        <div>
          <label htmlFor="description">
            Description
            <textarea name="description" id="description" />
          </label>
        </div>

        <div>
          <label htmlFor="deadline">
            Deadline
            <input type="date" name="deadline" id="deadline" />
          </label>
        </div>

        <p className={classes.actions}>
          <button type="button" onClick={onDone}>
            Cancel
          </button>
          <button type="submit">Add Task</button>
        </p>
      </form>
    </Modal>
  );
}
