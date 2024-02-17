import { Outlet, NavLink } from "react-router-dom";
import styles from "../styles/SharedLayout.module.css";

const SharedLayout = () => {
  return (
    <div className={styles.wrapperSection}>
      <header className={styles.headerWrp}>
        <nav>
          <ul className={styles.headerNavList}>
            <li>
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
    </div>
  );
};

export default SharedLayout;
