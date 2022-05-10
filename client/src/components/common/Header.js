import { NavLink } from "react-router-dom";

const Header = () => {

    return (
    <header>
        <h1>Demo Info System</h1>
      <nav className="nav-header">
        <NavLink to="/">
          Home
        </NavLink> |  
        <NavLink to="students">
        &nbsp;Students
        </NavLink> | 
        <NavLink to="dashboard">
        &nbsp;Dashboard
        </NavLink>
      </nav>
    </header>
    );
  };
  
  export default Header;