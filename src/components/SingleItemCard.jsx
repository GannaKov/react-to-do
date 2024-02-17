/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "../styles/ToDoItem.module.css";
import style from "../styles/SingleItemCard.module.css";
import { FaCheck } from "react-icons/fa";

const SingleItemCard = ({ task, tasksArr, setTask }) => {
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
    setTask({
      id: task.id,
      taskName: inputText.trim().replace(/\s\s+/g, " "),
      task: textAreaText.trim().replace(/\s\s+/g, " "),
      isDone: task.isDone,
    });
    // setTasksArr(updatedTodos);
    localStorage.setItem("toDoList", JSON.stringify(updatedTodos));
  }

  function toggleCompletion() {
    setIsDone((prev) => !prev);
    const updatedTasks = tasksArr.map((t) =>
      t.id === task.id ? { ...t, isDone: !t.isDone } : t
    );

    // setTasksArr(updatedTasks);
    localStorage.setItem("toDoList", JSON.stringify(updatedTasks));
  }

  return (
    <div className={style.singleCardWrp}>
      <div className={styles.wbsCard}>
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
          <div
            className={`${styles.wbsItemCheckbox} ${styles.checkbox}`}
            onClick={toggleCompletion}
          >
            {isDone && (
              <FaCheck
                className={`${styles.checkboxIcon} ${styles.checkbox}`}
              />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleItemCard;
