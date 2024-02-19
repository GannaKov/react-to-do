import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDataFromLocalStorage } from "../services/requesrs";
import Spinner from "../components/Spinner";
// import SingleItemCard from "../components/SingleItemCard";
import OneTaskCard from "../components/OneTaskCard";
import styles from "../styles/SingleTaskPage.module.css";

const SingleTaskPage = () => {
  const { id } = useParams();
  const [tasksArr, setTasksArr] = useState(null);
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  // const location = useLocation();
  // const backLinkHref = location.state?.from ?? "/tasks";
  const backLinkHref = "/tasks";

  useEffect(() => {
    setIsLoading(true);
    getDataFromLocalStorage()
      .then((res) => {
        setTasksArr(res);
        const singleTask = res.filter((item) => item.id === Number(id));
        setTask(singleTask[0]);
      })
      .catch((error) => console.log(error.message))
      .finally(() => {
        setIsLoading(false);
        setFetched(true);
      });
  }, [id]);

  function onOkClick(newTask) {
    const updatedTodos = tasksArr.map((todo) =>
      todo.id === newTask.id ? newTask : todo
    );
    setTask(newTask);
    localStorage.setItem("toDoList", JSON.stringify(updatedTodos));
  }

  return (
    <>
      <div className={styles.wbsGoBackWrp}>
        <Link to={backLinkHref}>
          <button className={styles.wbsGoBackBtn}>
            &larr; Back to products
          </button>
        </Link>
      </div>

      {isLoading && <Spinner />}
      {fetched && (
        <>
          {task ? (
            // <SingleItemCard
            //   task={task}
            //   tasksArr={tasksArr}
            //   setTask={setTask}
            //   setTasksArr={setTaskArr}
            // />
            <div className={styles.singleCardWrp}>
              {" "}
              <OneTaskCard
                task={task}
                tasksArr={tasksArr}
                setTasksArr={setTasksArr}
                onOkClick={onOkClick}
                btnDelete={false}
              />
            </div>
          ) : (
            <p>no task</p>
          )}
        </>
      )}
    </>
  );
};

export default SingleTaskPage;
