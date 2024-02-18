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
  const [priority, setPriority] = useState("");

  const [option, setOption] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [arrUploaded, setArrUploaded] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getDataFromLocalStorage()
      .then((res) => {
        if (res && res.length !== 0) {
          setTasksArr(res);
        }
      })
      .catch((error) => console.log(error.message))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (tasksArr.length !== 0) {
      setIsStartPageShown(false);
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
    } else {
      setIsStartPageShown(true);
    }

    setArrUploaded(true);
  }, [arrUploaded, option, tasksArr]);

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
      {arrUploaded && (
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
              filteredArr={filteredArr}
            />
          )}
        </>
      )}
    </>
  );
};

export default TasksPage;
