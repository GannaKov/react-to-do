/* eslint-disable react/prop-types */

import styles from "../styles/Form.module.css";

const Form = ({
  onFormSubmit,
  //setNewTask
  setNameTask,
  setTask,
}) => {
  // function onImputChange(e) {
  //   setNewTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
