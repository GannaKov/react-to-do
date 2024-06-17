import { Outlet, NavLink } from "react-router-dom";
import styles from "../styles/SharedLayout.module.css";
import stopwatch from "../assets/images/stopwatch.png";
import Footer from "./Footer";

const SharedLayout = () => {
  return (
    <div className={styles.wrapperSection}>
      <header className={styles.headerWrp}>
        <nav className={styles.headerNav}>
          <img src={stopwatch} alt="stopwatch" className={styles.img} />
          <ul className={styles.headerNavList}>
            <li className={styles.headerNavItem}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.active} ${styles.headerNavLink}`
                    : `${styles.headerNavLink}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tasks"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.active} ${styles.headerNavLink}`
                    : `${styles.headerNavLink}`
                }
              >
                Tasks
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
      <Footer />
    </div>
  );
};

export default SharedLayout;
