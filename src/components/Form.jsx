/* eslint-disable react/prop-types */

import styles from "../styles/Form.module.css";

const Form = ({
  onFormSubmit,
  //setNewTask
  setNameTask,
  setTask,
  setPriority,
  priority,
}) => {
  // function onImputChange(e) {
  //   setNewTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // }
  // function RadioBtnHandler(e) {
  //   setStateForm((prev) => ({
  //     ...prev,
  //     priority: e.target.value,
  //   }));
  // }
  return (
    <div className={styles.wbsFormSection}>
      <form className={styles.wbsForm} onSubmit={onFormSubmit}>
        <div className={styles.wbsFormDiv}>
          <label htmlFor="taskName" className={styles.wbsLabel}>
            Task name
          </label>
          <input
            name="taskName"
            type="text"
            className={styles.wbsInput}
            id="taskName"
            //  onChange={onImputChange}
            onChange={(e) => setNameTask(e.target.value)}
          />
        </div>
        <div className={styles.wbsFormDiv}>
          <label htmlFor="task" className={styles.wbsLabel}>
            Task
          </label>
          <textarea
            name="task"
            className={styles.wbsTextArea}
            rows="3"
            id="task"
            placeholder="Please enter your task..."
            //onChange={onImputChange}
            onChange={(e) => setTask(e.target.value)}
          ></textarea>
          <div className={styles.wbsFormRatioWrp}>
            <label>Priority?</label>
            <div className={styles.wbsFormRatio}>
              <div>
                <label className={styles.wbsFormRatioLabel} htmlFor="low">
                  low
                </label>
                <input
                  className={styles.wbsFormRatioImput}
                  id="low"
                  name="priority"
                  type="radio"
                  value="low"
                  checked={priority === "low"}
                  // onChange={(e) => setPriority(e.target.value)}
                  onChange={(e) => setPriority(e.target.value)}
                />
              </div>
              <div>
                <label className={styles.wbsFormRatioLabel} htmlFor="medium">
                  medium
                </label>
                <input
                  id="medium"
                  name="priority"
                  type="radio"
                  value="medium"
                  checked={priority === "medium"}
                  onChange={(e) => setPriority(e.target.value)}
                />
              </div>
              <div>
                <label className={styles.wbsFormRatioLabel} htmlFor="hard">
                  high
                </label>
                <input
                  id="hard"
                  name="priority"
                  type="radio"
                  value="high"
                  checked={priority === "high"}
                  onChange={(e) => setPriority(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className={styles.wbsBtn}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default Form;
//<div className={`${styles.wbsFormSection} ${styles.hidden}`}>
