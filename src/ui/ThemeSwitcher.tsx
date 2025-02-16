import { useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

import classes from "./ThemeSwitcher.module.css";
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";

import { useAppSelector } from "../hooks";
import { themeActions } from "../store/themeSlice";

export default function ThemeSwitcher() {
  const dispatch = useDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

  function handleToggleTheme() {
    dispatch(themeActions.toggleTheme());
  }

  return createPortal(
    <motion.button
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.5 }}
      onClick={handleToggleTheme}
      type="button"
      className={classes.toggler}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </motion.button>,
    document.getElementById("theme-switcher")!
  );
}
