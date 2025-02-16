import { motion } from "framer-motion";
import { useMemo } from "react";

import classes from "./TaskTabs.module.css";
import { TabType } from "../types/types";

import Badge from "./Badge";
import DropDownMenu from "../ui/DropDownMenu";

import { useAppDispatch, useAppSelector } from "../hooks";
import { tabsActions } from "../store/tabsSlice";

type TabProps = { name: TabType; children: React.ReactNode };

function Tab({ name, children }: TabProps) {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const selectedTab = useAppSelector((state) => state.tabs.selectedTab);

  const isSelected = selectedTab === name;

  const badgeCaption = useMemo(
    () =>
      tasks.filter((task) => {
        if (name === "all") return task;
        return task.status === name;
      }).length,
    [tasks, name]
  );

  function handleSelectTab(tabName: TabType) {
    dispatch(tabsActions.selectTab(tabName));
  }

  return (
    <li>
      <button
        type="button"
        className={isSelected ? "selected" : undefined}
        onClick={() => handleSelectTab(name)}
      >
        {children}
        <Badge key={badgeCaption} caption={badgeCaption} />
      </button>
      {isSelected && (
        <motion.div
          layoutId="tab-indicator"
          className={classes.activeTabIndicator}
        />
      )}
    </li>
  );
}

type TaskTabsProps = { children: React.ReactNode };

export default function TaskTabs({ children }: TaskTabsProps) {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <>
      <menu className={`${classes.menu} ${classes[theme]}`}>
        <div className={classes.tabs}>
          <Tab name="all">All</Tab>
          <Tab name="active">To-Do</Tab>
          <Tab name="completed">Completed</Tab>
        </div>
        <DropDownMenu />
      </menu>
      {children}
    </>
  );
}
