/* eslint-disable react/prop-types */

import styles from "../styles/ToDoList.module.css";
import ToDoItem from "./ToDoItem";

const ToDoList = ({
  tasksArr,
  //handleDeleteTask,
  setTasksArr,
  filteredArr,
  arrForShow,
  setArrForShow,
  setFilteredArr,
}) => {
  return (
    <ul className={styles.wbsList}>
      {arrForShow.map((task) => (
        <li className={styles.wbsItem} key={task.id}>
          <ToDoItem
            task={task}
            setTasksArr={setTasksArr}
            tasksArr={tasksArr}
            setFilteredArr={setFilteredArr}
            arrForShow={arrForShow}
            setArrForShow={setArrForShow}
          />
        </li>
      ))}
    </ul>
  );
};

export default ToDoList;
