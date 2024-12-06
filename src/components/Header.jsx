import styled from "styled-components";
import { useState } from "react";

const HeaderContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  border-radius: 10px;
  border: 2px solid #9e78cf;
  background: transparent;
  width: 381px;
  height: 40px;
  color: var(--color-white);
  padding: 0px 15px;
  font-size: 14px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: var(--color-light-gray);
  }
`;

const Button = styled.button`
  background: #9e78cf;
  height: 40px;
  width: 40px;
  border-radius: 10px;
  color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 3rem;
  font-weight: 200;
`;

export default function Header({ handleUpdateTasks }) {
  const [task, setTask] = useState("");

  function handleChange(event) {
    setTask(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleAddButtonClick();
    }
  }

  function handleAddButtonClick() {
    if (task.trim() === "") {
      return;
    }
    handleUpdateTasks(task);
    setTask("");
  }

  return (
    <>
      <HeaderContainer>
        <Input
          placeholder="Add a new task"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          type="text"
          required
          value={task}
        />
        <Button onClick={handleAddButtonClick}>+</Button>
      </HeaderContainer>
    </>
  );
}
