/* eslint-disable react/prop-types */

import styles from "../styles/MainFormListComp.module.css";
import Form from "./Form";
import ToDoList from "./ToDoList";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import frog from "../assets/images/frog-green-md.png";
import highIcon from "../assets/images/high.svg";

const MainFormListComponent = ({
  tasksArr,
  setTasksArr,
  onFormSubmit,
  setNameTask,
  setTask,
  isFormHidden,
  handleAddBtnClick,
  setOption,
  option,

  setPriority,
  priority,
  sortByPriority,
  setSortByPriority,
  arrForShow,
}) => {
  const handleChange = (event) => {
    setOption(event.target.value);
  };

  const handleChangePrioritySort = (event) => {
    setSortByPriority(event.target.value);
  };

  return (
    <div className={styles.wbsPageWrp}>
      <div className={styles.wbsContainer}>
        {!isFormHidden && (
          <Form
            onFormSubmit={onFormSubmit}
            setNameTask={setNameTask}
            setTask={setTask}
            setPriority={setPriority}
            priority={priority}
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
              <div className={styles.dropDown}>
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
              </div>
              <div className={styles.dropDown}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    value={sortByPriority}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    onChange={handleChangePrioritySort}
                  >
                    <MenuItem value="no">No Sort</MenuItem>
                    <MenuItem value="high">
                      First&nbsp;&nbsp;
                      <span className={`${styles.highIcon} ${styles.icon}`} />
                    </MenuItem>
                    <MenuItem value="low">
                      First&nbsp;&nbsp;
                      <span className={`${styles.lowIcon} ${styles.icon}`} />
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>

              {arrForShow && arrForShow.length > 0 ? (
                <ToDoList
                  tasksArr={tasksArr}
                  arrForShow={arrForShow}
                  setTasksArr={setTasksArr}
                />
              ) : (
                <>
                  <p className={styles.text}>
                    There is nothing in {option.toUpperCase()} list.
                  </p>
                  <img className={styles.img} src={frog} alt="Frog" />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainFormListComponent;
