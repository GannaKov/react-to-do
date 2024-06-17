import logo from "../assets/images/logo.png";

import styles from "../styles/Home.module.css";
const Home = () => {
  return (
    <section className={styles.pageWrp}>
      <div className={styles.containerWrp}>
        <h1 className={styles.title}>Noted</h1>
        <img src={logo} alt="logo" className={styles.logoImg} />

        <p className={styles.text}>Welcome to the Task Manager!</p>
        {/* <img src={stopwatch} alt="stopwatch" className={styles.img} /> */}
      </div>
    </section>
  );
};

export default Home;
