import React, { useState } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import {
  BiSolidUserCircle,
  BiHome,
  BiLogOut,
  BiHide,
  BiShow,
  BiSolidWrench,
  BiSolidFileFind,
  BiDownload,
  BiSolidStar,
} from "react-icons/bi";
import { setAccess, setUser } from "../../redux/actions";
import styles from "./SideBar.module.css";
import { useSelector } from "react-redux";

export default function NavBar(props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const blocked = useSelector((state) => state.blocked);

  const logoutHandler = (event) => {
    props.setLogout(true)
  };

  const blockedPaths = ["/", "/login", "/register", "/recovery", "*", "/home"];

  // Check if the current path is blocked
  const isPathBlocked = blockedPaths.includes(location.pathname);

  return (
    <div className={isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}>
      {blocked ? (
        <div className={styles.blocked}>
          <div className={styles.blocked}></div>
        </div>
      ) : null}
      <div className={styles.sbIcon}>
        <BiSolidUserCircle
          className={styles.icon}
          style={{ color: "white", fontSize: isSidebarOpen ? 100 : 50 }}
        />
      </div>
      <div className={styles.sidebarContent}>
        <div
          className={
            isSidebarOpen ? styles.navContainer : styles.navContainerClosed
          }
        >
          {!isPathBlocked && (
            <>
              <NavLink to="/home" className={styles.navLink}>
                {isSidebarOpen ? <label>Home</label> : <BiHome title="Home"/>}
              </NavLink>
              <NavLink to="/home/manage_wo/" className={styles.navLink}>
                {isSidebarOpen ? (
                  <label>Manage Work Orders</label>
                ) : (
                  <BiSolidStar title="Manage Work Orders" />
                )}
              </NavLink>


              <NavLink to="/home/manage_projects/" className={styles.navLink}>
                {isSidebarOpen ? (
                  <label>Manage Projects</label>
                ) : (
                  <BiSolidStar title="Manage Projects" />
                )}
              </NavLink>
              <NavLink to="/home/manage_tasks/" className={styles.navLink}>
                {isSidebarOpen ? <label>Manage Tasks</label> : <BiSolidStar title="Manage Tasks"/>}
              </NavLink>

              <NavLink to="/home/control_panel" className={styles.navLink}>
                {isSidebarOpen ? (
                  <label>Control Panel</label>
                ) : (
                  <BiSolidWrench title="Control Panel" />
                )}
              </NavLink>
              <NavLink
                onClick={logoutHandler}
                className={styles.navLink}
              >
                {isSidebarOpen ? <label>Log Out</label> : <BiLogOut title="Log Out" />}
              </NavLink>
            </>
          )}
        </div>
        <div
          className={
            isSidebarOpen
              ? styles.toggleButtonContainerOpen
              : styles.toggleButtonContainerClosed
          }
        >
          <label
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={styles.navLink}
          >
            {isSidebarOpen ? <BiHide /> : <BiShow />}
          </label>
        </div>
      </div>
    </div>
  );
}
