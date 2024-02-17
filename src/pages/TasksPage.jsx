import { useState, useEffect } from "react";

import StartComponent from "../components/StartComponent";
import MainFormListComponent from "../components/MainFormListComponent";
import Spinner from "../components/Spinner";
import { getDataFromLocalStorage } from "../services/requesrs";

const TasksPage = () => {
  const [tasksArr, setTasksArr] = useState([]);
  const [filteredArr, setFilteredArr] = useState([]);
  const [isStartPageShown, setIsStartPageShown] = useState(false);
  const [isFormHidden, setIsFormHidden] = useState(true);
  const [nameTask, setNameTask] = useState("");
  const [task, setTask] = useState("");

  const [option, setOption] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [arrUploaded, setArrUploaded] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getDataFromLocalStorage()
      .then((res) => {
        if (res || res.length !== 0) {
          setTasksArr(res);
        }
      })
      .catch((error) => console.log(error.message))
      .finally(() => {
        setIsLoading(false);
        setArrUploaded(true);
      });
  }, []);

  useEffect(() => {
    if (tasksArr.length !== 0) {
      setIsStartPageShown(false);
    } else {
      setIsStartPageShown(true);
    }

    // localStorage.setItem("toDoList", JSON.stringify(tasksArr));
  }, [tasksArr]);

  useEffect(() => {
    if (tasksArr) {
      const updatedFilteredTaskArr = tasksArr.filter((task) => {
        if (option === "all") {
          return true;
        } else if (option === "completed") {
          return task.isDone;
        } else if (option === "notCompleted") {
          return !task.isDone;
        }
      });
      setFilteredArr(updatedFilteredTaskArr);
    }
  }, [arrUploaded, option, tasksArr]);
  //&& tasksArr.length != 0
  function onFormSubmit(e) {
    e.preventDefault();
    if (task === "" || nameTask === "") {
      alert("Fill in all the fields");
    } else {
      let arr;
      arr = [
        { id: Date.now(), isDone: false, task: task, taskName: nameTask },
        ...tasksArr,
      ];
      setTasksArr(arr);
      localStorage.setItem("toDoList", JSON.stringify(arr));
      setIsFormHidden(true);
      setOption("all");
      setNameTask("");
      setTask("");
    }
  }

  function handleStartBtnClick() {
    setIsStartPageShown(false);
    setIsFormHidden(false);
  }

  function handleAddBtnClick() {
    setIsFormHidden(false);
  }

  return (
    <>
      {isLoading && <Spinner />}
      {arrUploaded && isStartPageShown ? (
        <StartComponent handleStartBtnClick={handleStartBtnClick} />
      ) : (
        <MainFormListComponent
          tasksArr={tasksArr}
          isFormHidden={isFormHidden}
          setTasksArr={setTasksArr}
          onFormSubmit={onFormSubmit}
          // setNewTask={setNewTask}
          setNameTask={setNameTask}
          setTask={setTask}
          handleAddBtnClick={handleAddBtnClick}
          setOption={setOption}
          option={option}
          filteredArr={filteredArr}
        />
      )}
    </>
  );
};

export default TasksPage;
