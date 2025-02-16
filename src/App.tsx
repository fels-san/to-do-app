import { useEffect } from "react";

import Header from "./components/Header";
import TaskList from "./components/TaskList";
import ThemeSwitcher from "./ui/ThemeSwitcher";

import { useAppSelector } from "./hooks";

function App() {
  const theme = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    document.body.classList.toggle("dark-theme", theme === "dark");
    document.body.classList.toggle("light-theme", theme === "light");
  }, [theme]);

  return (
    <div>
      <div id="container" className={theme}>
        <Header />
        <div id="body">
          <TaskList />
        </div>
      </div>
      <ThemeSwitcher />
    </div>
  );
}

export default App;
