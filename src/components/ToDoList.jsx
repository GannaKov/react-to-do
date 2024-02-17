/* eslint-disable react/prop-types */
import styles from "../styles/ToDolist.module.css";
import ToDoItem from "./ToDoItem";

const ToDoList = ({
  tasksArr,
  //handleDeleteTask,
  setTasksArr,
  filteredArr,
}) => {
  return (
    <ul className={styles.wbsList}>
      {filteredArr.map((task) => (
        <li className={styles.wbsItem} key={task.id}>
          <ToDoItem task={task} setTasksArr={setTasksArr} tasksArr={tasksArr} />
        </li>
      ))}
    </ul>
  );
};

export default ToDoList;
