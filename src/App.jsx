import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Header from "./components/Header";
import Task from "./components/Task";

const STATUS = {
  CURRENT: "current",
  COMPLETED: "completed",
};

function App() {
  const [tasks, setTasks] = useState([]);

  function handleUpdateTasks(task) {
    setTasks((prevTasks) => {
      const updatedTasks = [
        ...prevTasks,
        {
          id: uuidv4(),
          text: task,
          status: STATUS.CURRENT,
        },
      ];
      return updatedTasks;
    });
  }

  function handleDoneTask(taskId) {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];

      return updatedTasks.map((task) =>
        task.id === taskId ? { ...task, status: STATUS.COMPLETED } : task
      );
    });
  }

  function handleDeleteTask(taskId) {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];

      return updatedTasks.filter((task) => task.id !== taskId);
    });
  }

  const currentTasks = tasks.filter((task) => task.status === STATUS.CURRENT);
  const completedTasks = tasks.filter(
    (task) => task.status === STATUS.COMPLETED
  );

  return (
    <>
      <div id="container">
        <Header handleUpdateTasks={handleUpdateTasks}></Header>
        <div id="body">
          <div id="currentTasks">
            <h2 className="tasks-header">Task to do - {currentTasks.length}</h2>
            {currentTasks.map((task) => (
              <Task
                key={task.id}
                taskId={task.id}
                status={task.status}
                onDone={handleDoneTask}
                onDelete={handleDeleteTask}
              >
                {task.text}
              </Task>
            ))}
          </div>
          <div id="doneTasks">
            <h2 className="tasks-header">Done - {completedTasks.length}</h2>
            {completedTasks.map((task) => (
              <Task
                key={task.id}
                taskId={task.id}
                status={task.status}
                onDone={handleDoneTask}
                onDelete={handleDeleteTask}
              >
                {task.text}
              </Task>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
