/* eslint-disable react/prop-types */

import styles from "../styles/MainFormListComp.module.css";
import Form from "./Form";
import ToDoList from "./ToDoList";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import frog from "../assets/images/frog-green-md.png";

const MainFormListComponent = ({
  tasksArr,
  //isTaskArr,
  setTasksArr,
  onFormSubmit,
  // setNewTask,
  setNameTask,
  setTask,
  isFormHidden,
  handleAddBtnClick,
  //handleDeleteTask,
  setOption,
  option,
  filteredArr,
  // handleEditTask,
}) => {
  const handleChange = (event) => {
    setOption(event.target.value);
  };
  return (
    <>
      {!isFormHidden && (
        <Form
          onFormSubmit={onFormSubmit}
          //setNewTask={setNewTask}
          setNameTask={setNameTask}
          setTask={setTask}
        />
      )}

      <div className={styles.wbsSection}>
        {isFormHidden && (
          <button
            className={styles.wbsListBtnAdd}
            onClick={handleAddBtnClick}
            type="button"
          >
            Add
          </button>
        )}
        {tasksArr && (
          <>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={option}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                onChange={handleChange}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="notCompleted">Not Completed</MenuItem>
              </Select>
            </FormControl>
            {filteredArr && filteredArr.length > 0 ? (
              <ToDoList
                tasksArr={tasksArr}
                filteredArr={filteredArr}
                // handleAddBtnClick={handleAddBtnClick}
                //handleDeleteTask={handleDeleteTask}
                setTasksArr={setTasksArr}
                option={option}
                // handleEditTask={handleEditTask}
              />
            ) : (
              <>
                <p className={styles.text}>
                  There is nothing in {option} list.
                </p>
                <img className={styles.img} src={frog} alt="Frog" />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MainFormListComponent;
