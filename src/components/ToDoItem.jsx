/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "../styles/ToDoItem.module.css";
import { FaCheck } from "react-icons/fa";

const ToDoItem = ({ task, setTasksArr, tasksArr }) => {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [inputText, setInputText] = useState(task.taskName);
  const [textAreaText, setTextAreaText] = useState(task.task);
  const [isDone, setIsDone] = useState(task.isDone);

  const inputClassName = isReadOnly
    ? `${styles.wbsItemInput} ${styles.hidden}`
    : `${styles.wbsItemInput} `;

  const textAreaClassName = isReadOnly
    ? `${styles.wbsItemTextArea} ${styles.hidden}`
    : `${styles.wbsItemTextArea} `;

  function handleDeleteTask(idItem) {
    const arr = tasksArr.filter((task) => task.id != idItem);
    console.log(arr);
    setTasksArr(arr);
    localStorage.setItem("toDoList", JSON.stringify(arr));
    // if (arr.length === 0) {
    //   localStorage.removeItem("toDoList");
    // }
  }
  function toggleCompletion() {
    setIsDone((prev) => !prev);
    const updatedTasks = tasksArr.map((t) =>
      t.id === task.id ? { ...t, isDone: !t.isDone } : t
    );

    setTasksArr(updatedTasks);
    localStorage.setItem("toDoList", JSON.stringify(updatedTasks));
  }

  function onEditClick() {
    setIsReadOnly(false);
  }

  function onOkClick() {
    setIsReadOnly(true);
    const updatedTodos = tasksArr.map((todo) =>
      todo.id === task.id
        ? {
            id: task.id,
            taskName: inputText.trim().replace(/\s\s+/g, " "),
            task: textAreaText.trim().replace(/\s\s+/g, " "),
            isDone: task.isDone,
          }
        : todo
    );

    setTasksArr(updatedTodos);
    // setInputText(inputText.trim().replace(/\s\s+/g, " "));
    // setTextAreaText(textAreaText.trim().replace(/\s\s+/g, " "));
    localStorage.setItem("toDoList", JSON.stringify(updatedTodos));
  }

  return (
    <div className={styles.wbsCard}>
      <button className={styles.wbsOpenTaskBtn} type="button">
        Open Task
      </button>
      <div className={styles.wbsInnWrp}>
        {isReadOnly ? (
          <h2 className={styles.wbsItemTitle}>{task.taskName}</h2>
        ) : (
          <input
            className={inputClassName}
            type="text"
            value={inputText}
            readOnly={isReadOnly}
            onChange={(e) => setInputText(e.target.value)}
          />
        )}

        {/* className={`${styles.wbsItemInput} ${styles.hidden}`} */}
        {/*  */}
        <div
          className={`${styles.wbsItemCheckbox} ${styles.checkbox}`}
          onClick={toggleCompletion}
        >
          {/* <input
            type="checkbox"
            name="check"
            id="check"
            checked={isDone}
            className={`${styles.visuallyHidden} ${styles.checkboxInput}`}
            onChange={toggleCompletion}
          /> */}
          {/* <FaCheck className={`${styles.checkboxIcon} ${styles.checkbox}`} /> */}
          {isDone && (
            <FaCheck className={`${styles.checkboxIcon} ${styles.checkbox}`} />
          )}
        </div>
      </div>
      <div className={styles.wbsCardBottom}>
        {isReadOnly ? (
          <pre className={`${styles.wbsItemText} ${styles.shortTask}`}>
            {task.task}
          </pre>
        ) : (
          <textarea
            className={textAreaClassName}
            id="task"
            value={textAreaText}
            readOnly={isReadOnly}
            onChange={(e) => {
              setTextAreaText(e.target.value);
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          ></textarea>
        )}
        <div className={styles.wbsBtnWrp}>
          {isReadOnly ? (
            <button
              type="button"
              className={`${styles.wbsBtnBottom} ${styles.wbsBtnEdit}`}
              onClick={onEditClick}
            >
              Edit
            </button>
          ) : (
            <button
              type="button"
              className={`${styles.wbsBtnBottom} ${styles.wbsBtnEdit}`}
              onClick={onOkClick}
            >
              Ok
            </button>
          )}

          <button
            type="button"
            className={`${styles.wbsBtnBottom} ${styles.wbsBtnDelete}`}
            onClick={() => handleDeleteTask(task.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToDoItem;
