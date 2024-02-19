/* eslint-disable react/prop-types */


import { Link } from "react-router-dom";
import OneTaskCard from "./OneTaskCard";
import styles from "../styles/ToDoItem.module.css";

const ToDoItem = ({ task, setTasksArr, tasksArr }) => {
  function onOkClick(newTask) {
    const updatedTodos = tasksArr.map((todo) =>
      todo.id === newTask.id ? newTask : todo
    );

    setTasksArr(updatedTodos);
    localStorage.setItem("toDoList", JSON.stringify(updatedTodos));
  }

  return (
    <OneTaskCard
      task={task}
      tasksArr={tasksArr}
      setTasksArr={setTasksArr}
      onOkClick={onOkClick}
      btnDelete={true}
    >
      <Link className={styles.wbsOpenTaskLink} to={`${task.id}`}>
        <button className={styles.wbsOpenTaskBtn} type="button">
          Open Task
        </button>
      </Link>
    </OneTaskCard>
  );
};

export default ToDoItem;
