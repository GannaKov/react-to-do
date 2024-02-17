/* eslint-disable react/prop-types */
import sleepCat from "../assets/images/sleepcat.png";
import styles from "../styles/StartComponent.module.css";
const StartComponent = ({ handleStartBtnClick }) => {
  return (
    <div className={styles.wbsStartSection}>
      <div className={styles.wbsStartContainer}>
        <p className={styles.wbsStartText}>Your To-Do list is empty.</p>
        <p className={styles.wbsStartText}>
          Would you like to add your first task?
        </p>
        <button
          className={styles.wbsStartBtnAdd}
          onClick={handleStartBtnClick}
          type="button"
        >
          Add
        </button>
        <img className={styles.wbsStartImg} src={sleepCat} alt="Sleeping Cat" />
      </div>
    </div>
  );
};

export default StartComponent;
