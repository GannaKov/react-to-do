/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "../styles/OneTaskCard.module.css";
import { FaCheck } from "react-icons/fa";

const OneTaskCard = ({
  children,

  task,
  tasksArr,
  setTasksArr,

  onOkClick,
  btnDelete,
}) => {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [inputText, setInputText] = useState(task.taskName);
  const [textAreaText, setTextAreaText] = useState(task.task);
  const [isDone, setIsDone] = useState(task.isDone);
  const [priority, setPriority] = useState(task.priority);

  const inputClassName = isReadOnly
    ? `${styles.wbsItemInput} ${styles.hidden}`
    : `${styles.wbsItemInput} `;

  const textAreaClassName = isReadOnly
    ? `${styles.wbsItemTextArea} ${styles.hidden}`
    : `${styles.wbsItemTextArea} `;

  function onEditClick() {
    setIsReadOnly(false);
  }
  function handlePriorityBtnClick(e) {
    setPriority(e.target.id);
  }
  function handleDeleteTask(idItem) {
    const arr = tasksArr.filter((task) => task.id != idItem);
    setTasksArr(arr);

    localStorage.setItem("toDoList", JSON.stringify(arr));
  }
  function toggleCompletion() {
    setIsDone((prev) => !prev);
    const updatedTasks = tasksArr.map((t) =>
      t.id === task.id ? { ...t, isDone: !t.isDone } : t
    );

    setTasksArr(updatedTasks);
    localStorage.setItem("toDoList", JSON.stringify(updatedTasks));
  }
  function handleOkClick() {
    setIsReadOnly(true);
    const newTask = {
      id: task.id,
      taskName: inputText.trim().replace(/\s\s+/g, " "),
      task: textAreaText.trim().replace(/\s\s+/g, " "),
      isDone: isDone,
      priority: priority,
    };

    onOkClick(newTask);
  }

  return (
    <div className={styles.taskWrp}>
      {isReadOnly ? (
        <div className={`${styles[priority]} ${styles.boxPriority}`}></div>
      ) : (
        <div
          className={styles.taskBtnsPriorityWrp}
          onClick={handlePriorityBtnClick}
        >
          <button
            id="low"
            className={`${styles.low} ${styles.taskBtnPriority}`}
          ></button>
          <button
            id="medium"
            className={`${styles.medium} ${styles.taskBtnPriority}`}
          ></button>
          <button
            id="high"
            className={`${styles.high} ${styles.taskBtnPriority}`}
          ></button>
        </div>
      )}

      <div className={styles.wbsCard}>
        {children}

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
                onClick={handleOkClick}
              >
                Ok
              </button>
            )}

            {btnDelete && (
              <button
                type="button"
                className={`${styles.wbsBtnBottom} ${styles.wbsBtnDelete}`}
                onClick={() => handleDeleteTask(task.id)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneTaskCard;
