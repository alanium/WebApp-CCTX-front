import React, { useState } from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { BiSolidUserCircle, BiHome, BiLogOut, BiHide, BiShow, BiSolidWrench, BiSolidFileFind, BiDownload} from 'react-icons/bi';
import { setAccess, setUser } from '../../redux/actions';
import styles from './SideBar.module.css';

export default function NavBar(props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandler = (event) => {
    window.location.reload()
  };

  const allowedPaths = ["/home/view_wo", "/home/control_panel", "/home/download_wo"]

  if ( allowedPaths.includes(location.pathname))
    return (
      <div className={isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}>
        <div className={styles.sbIcon}>
            <BiSolidUserCircle className={styles.icon} style={{ color: 'white', fontSize: isSidebarOpen ? 100 : 50 }} />
        </div>
        <div className={styles.sidebarContent}>
            
            <div className={isSidebarOpen ? styles.navContainer : styles.navContainerClosed}>
                <NavLink to="/home" className={styles.navLink}>
                {isSidebarOpen ? <label>Home</label> : <BiHome />}
                </NavLink>
                <NavLink to="/home/view_wo" className={styles.navLink}>
                {isSidebarOpen ? <label>View Work Orders</label> : <BiSolidFileFind />}
                </NavLink>
                <NavLink to="/home/download_wo" className={styles.navLink}>
                {isSidebarOpen ? <label>Download Work Orders</label> : <BiDownload />}
                </NavLink>
                <NavLink to="/home/control_panel" className={styles.navLink}>
                {isSidebarOpen ? <label>Control Panel</label> : <BiSolidWrench />}
                </NavLink>
                <NavLink to="/" onClick={logoutHandler} className={styles.navLink}>
                {isSidebarOpen ? <label>Log Out</label> : <BiLogOut/>}
                </NavLink>
            </div>
            <div className={isSidebarOpen ? styles.toggleButtonContainerOpen : styles.toggleButtonContainerClosed}>
            <label onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={styles.navLink}>
                {isSidebarOpen ? <BiHide/> : <BiShow/>}
            </label>
            </div>
        </div>
      </div>
    );
}
