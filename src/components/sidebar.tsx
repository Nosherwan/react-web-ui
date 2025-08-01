// import { Link, Form, NavLink } from 'react-router-dom';
import { NavLink } from "react-router";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) {
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div
      id="sidebar"
      className={`top-200 ${sidebarOpen ? "w-[200px]" : "w-[0]"}`}
    >
      <div
        id="sidebar-button"
        onClick={toggleSidebar}
        className={`${sidebarOpen ? "rotate-180" : ""}`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
          <path
            d="M10.294 9.698a.988.988 0 010-1.407 1.01 1.01 0 011.419 0l2.965 2.94a1.09 1.09 0 010 1.548l-2.955 2.93a1.01 1.01 0 01-1.42 0 .988.988 0 010-1.407l2.318-2.297-2.327-2.307z"
            fill="rgb(2, 90, 197)"
          ></path>
        </svg>
      </div>
      <div id="sidebar-content-container">
        <div id="sidebar-content">
          <nav>
            <ul>
              <li></li>
              <li>
                <NavLink to={`/`}>Home</NavLink>
                <NavLink to={`/help`}>Help</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
