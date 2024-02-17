import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDataFromLocalStorage } from "../services/requesrs";
import Spinner from "../components/Spinner";

const SingleTaskPage = () => {
  const { id } = useParams();
  const [tasksArr, setTaskArr] = useState(null);
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getDataFromLocalStorage()
      .then((res) => {
        console.log(res, id);
        const singleTask = res.filter((item) => item.id === Number(id));
        setTask(singleTask[0]);
        console.log(singleTask[0]);
      })
      .catch((error) => console.log(error.message))
      .finally(() => {
        setIsLoading(false);
        setFetched(true);
      });
  }, [id]);

  return (
    <>
      {isLoading && <Spinner />}
      {fetched && <>{task ? <div>{task.task}</div> : <p>no task</p>}</>}
    </>
  );
};

export default SingleTaskPage;
