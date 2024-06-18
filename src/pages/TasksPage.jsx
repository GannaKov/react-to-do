import { useState, useEffect } from "react";

import StartComponent from "../components/StartComponent";
import MainFormListComponent from "../components/MainFormListComponent";
import Spinner from "../components/Spinner";
import { getDataFromLocalStorage } from "../services/requesrs";

const TasksPage = () => {
  const [tasksArr, setTasksArr] = useState([]);
  const [arrForShow, setArrForShow] = useState([]);

  const [isStartPageShown, setIsStartPageShown] = useState(false);
  const [isFormHidden, setIsFormHidden] = useState(true);

  const [nameTask, setNameTask] = useState("");
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("low");

  const [option, setOption] = useState("all");
  const [sortByPriority, setSortByPriority] = useState("no");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getDataFromLocalStorage()
      .then((res) => {
        if (res && res.length !== 0) {
          setTasksArr(res);
          setArrForShow(res);
        }
      })
      .catch((error) => console.log(error.message))
      .finally(() => {
        setIsLoading(false);
      });
    if (tasksArr.length !== 0) {
      setIsStartPageShown(false);
    } else {
      setIsStartPageShown(true);
    }
  }, [tasksArr.length]);

  useEffect(() => {
    let updatedFilteredTaskArr = [...tasksArr];
    if (tasksArr.length !== 0) {
      if (option === "completed") {
        updatedFilteredTaskArr = updatedFilteredTaskArr.filter(
          (task) => task.isDone === true
        );
      }
      if (option === "notCompleted") {
        updatedFilteredTaskArr = updatedFilteredTaskArr.filter(
          (task) => task.isDone === false
        );
      }
      //--------------------
      if (sortByPriority !== "no") {
        const highTaskArr = updatedFilteredTaskArr.filter(
          (task) => task.priority === "high"
        );
        const lowTaskArr = updatedFilteredTaskArr.filter(
          (task) => task.priority === "low"
        );
        const mediumTaskArr = updatedFilteredTaskArr.filter(
          (task) => task.priority === "medium"
        );
        if (sortByPriority === "high") {
          updatedFilteredTaskArr = [
            ...highTaskArr,
            ...mediumTaskArr,
            ...lowTaskArr,
          ];
        }
        if (sortByPriority === "low") {
          updatedFilteredTaskArr = [
            ...lowTaskArr,
            ...mediumTaskArr,
            ...highTaskArr,
          ];
        }
      }
    }

    setArrForShow(updatedFilteredTaskArr);
  }, [option, sortByPriority, tasksArr]);

  function onFormSubmit(e) {
    e.preventDefault();
    if (task === "" || nameTask === "") {
      alert("Fill in all the fields");
    } else {
      let arr;
      arr = [
        {
          id: Date.now(),
          isDone: false,
          task: task,
          taskName: nameTask,
          priority: priority,
        },
        ...tasksArr,
      ];
      setTasksArr(arr);
      setArrForShow(arr);
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
      {/* {arrUploaded && ( */}
      <>
        {isStartPageShown && tasksArr.length === 0 && (
          <StartComponent handleStartBtnClick={handleStartBtnClick} />
        )}
        {!isStartPageShown && (
          <MainFormListComponent
            tasksArr={tasksArr}
            isFormHidden={isFormHidden}
            setTasksArr={setTasksArr}
            onFormSubmit={onFormSubmit}
            // setNewTask={setNewTask}
            setNameTask={setNameTask}
            setTask={setTask}
            setPriority={setPriority}
            priority={priority}
            handleAddBtnClick={handleAddBtnClick}
            setOption={setOption}
            option={option}
            // filteredArr={filteredArr}
            // setFilteredArr={setFilteredArr}
            sortByPriority={sortByPriority}
            setSortByPriority={setSortByPriority}
            // setArrForShow={setArrForShow}
            arrForShow={arrForShow}
          />
        )}
      </>
      {/* )} */}
    </>
  );
};

export default TasksPage;
