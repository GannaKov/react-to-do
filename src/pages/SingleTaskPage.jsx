import { useLocation, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDataFromLocalStorage } from "../services/requesrs";
import Spinner from "../components/Spinner";
import SingleItemCard from "../components/SingleItemCard";

const SingleTaskPage = () => {
  const { id } = useParams();
  const [tasksArr, setTaskArr] = useState(null);
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/tasks";

  useEffect(() => {
    setIsLoading(true);
    getDataFromLocalStorage()
      .then((res) => {
        setTaskArr(res);
        const singleTask = res.filter((item) => item.id === Number(id));
        setTask(singleTask[0]);
      })
      .catch((error) => console.log(error.message))
      .finally(() => {
        setIsLoading(false);
        setFetched(true);
      });
  }, [id]);

  return (
    <>
      <button>
        <Link to={backLinkHref}>Back to products</Link>
      </button>
      {isLoading && <Spinner />}
      {fetched && (
        <>
          {task ? (
            <SingleItemCard task={task} tasksArr={tasksArr} setTask={setTask} />
          ) : (
            <p>no task</p>
          )}
        </>
      )}
    </>
  );
};

export default SingleTaskPage;
