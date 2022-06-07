import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>Demo Info System</h1>
      <nav>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            color: isActive ? "#fff" : "#a7a9ac",
          })}
        >
          Home
        </NavLink>
        <NavLink
          to="students"
          style={({ isActive }) => ({
            color: isActive ? "#fff" : "#a7a9ac",
          })}
        >
          Students
        </NavLink>
        <NavLink
          to="dashboard"
          style={({ isActive }) => ({
            color: isActive ? "#fff" : "#a7a9ac",
          })}
        >
          Dashboard
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
