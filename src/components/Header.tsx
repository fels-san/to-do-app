import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import classes from "./Header.module.css";
import NewTask from "./NewTask";

import { useAppSelector } from "../hooks";

export default function Header() {
  const { theme } = useAppSelector((state) => state.theme);

  const [isCreatingTask, setIsCreatingTask] = useState(false);

  const toggleTaskCreation = useCallback(() => {
    setIsCreatingTask((prev) => !prev);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isCreatingTask && <NewTask onDone={toggleTaskCreation} />}
      </AnimatePresence>

      <header className={`${classes.header} ${classes[theme]}`}>
        <h1>Your Tasks</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={toggleTaskCreation}
          aria-label="Добавить новую задачу"
        >
          +
        </motion.button>
      </header>
    </>
  );
}
