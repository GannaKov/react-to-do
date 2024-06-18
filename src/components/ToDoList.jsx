/* eslint-disable react/prop-types */

import styles from "../styles/ToDoList.module.css";
import ToDoItem from "./ToDoItem";

const ToDoList = ({
  tasksArr,

  setTasksArr,

  arrForShow,
}) => {
  return (
    <ul className={styles.wbsList}>
      {arrForShow.map((task) => (
        <li className={styles.wbsItem} key={task.id}>
          <ToDoItem task={task} setTasksArr={setTasksArr} tasksArr={tasksArr} />
        </li>
      ))}
    </ul>
  );
};

export default ToDoList;
