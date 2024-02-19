/* eslint-disable react/prop-types */

import style from "../styles/SingleItemCard.module.css";

import OneTaskCard from "./OneTaskCard";

const SingleItemCard = ({ task, setTask, tasksArr, setTasksArr }) => {
  function onOkClick(newTask) {
    const updatedTodos = tasksArr.map((todo) =>
      todo.id === newTask.id ? newTask : todo
    );
    setTask(newTask);
    localStorage.setItem("toDoList", JSON.stringify(updatedTodos));
  }

  return (
    <div className={style.singleCardWrp}>
      <OneTaskCard
        task={task}
        tasksArr={tasksArr}
        setTasksArr={setTasksArr}
        onOkClick={onOkClick}
        btnDelete={false}
      />
    </div>
  );
};

export default SingleItemCard;
