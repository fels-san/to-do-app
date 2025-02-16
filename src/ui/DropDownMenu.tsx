import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import classes from "./DropDownMenu.module.css";
import { SortType } from "../types/types";

import CaretIcon from "./icons/CaretIcon";

import { useAppDispatch, useAppSelector } from "../hooks";
import { sortActions } from "../store/sortSlice";

type DropDownItemProps = { selectedSort: SortType };

function DropDownItem({ selectedSort }: DropDownItemProps) {
  const dispatch = useAppDispatch();

  function handleSelectSort() {
    dispatch(sortActions.selectSort(selectedSort));
  }

  return (
    <li>
      <button type="button" onClick={handleSelectSort}>
        {`${selectedSort.sortName} (${selectedSort.order})`}
      </button>
    </li>
  );
}

export default function DropDownMenu() {
  const theme = useAppSelector((state) => state.theme.theme);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={`${classes.dropdown} ${classes[theme]}`}>
      <button type="button" className={classes.sortButton} onClick={toggleMenu}>
        Sort by <CaretIcon />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            key="menu"
            style={{ overflow: "hidden" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, y: 10 }}
            className={classes.dropdownMenu}
          >
            <DropDownItem
              selectedSort={{ sortName: "creation date", order: "ascending" }}
            />
            <DropDownItem
              selectedSort={{ sortName: "creation date", order: "descending" }}
            />
            <DropDownItem
              selectedSort={{ sortName: "deadline", order: "ascending" }}
            />
            <DropDownItem
              selectedSort={{ sortName: "deadline", order: "descending" }}
            />
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
