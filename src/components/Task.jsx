import styled from "styled-components";

const statusStyles = {
  current: {
    color: "#9e78cf",
    textDecoration: "none",
  },
  completed: {
    color: "#78cfb0",
    textDecoration: "line-through",
  },
};

const TaskContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #15101c;
  border-radius: 10px;
  padding: 20px;
  font-size: 14px;

  color: ${({ $status }) => statusStyles[$status]?.color || "#ffffff"};
  text-decoration: ${({ $status }) =>
    statusStyles[$status]?.textDecoration || "none"};
`;

const Button = styled.button`
  height: 30px;
  width: 30px;
  background: transparent;
  border: none;
  cursor: pointer;

  & svg {
    color: #9e78cf;
  }
`;

const STATUS = {
  CURRENT: "current",
  COMPLETED: "completed",
};

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className="bi bi-check2"
      viewBox="0 0 16 16"
    >
      <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className="bi bi-trash3"
      viewBox="0 0 16 16"
    >
      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
    </svg>
  );
}

export default function Task({
  taskId,
  status = STATUS.CURRENT,
  onDone,
  onDelete,
  children,
}) {
  return (
    <TaskContainer $status={status} key={taskId}>
      {children}
      {status === STATUS.CURRENT && (
        <div className="buttons">
          <Button onClick={() => onDone(taskId)}>
            <CheckIcon />
          </Button>
          <Button onClick={() => onDelete(taskId)}>
            <TrashIcon />
          </Button>
        </div>
      )}
    </TaskContainer>
  );
}
