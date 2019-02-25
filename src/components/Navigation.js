import React from "react";
import {NavLink} from 'react-router-dom'
const Navigation = () => {
  return (
    <div>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <NavLink className="navbar-brand" to="/">
              Crazy Snake
            </NavLink>
            <NavLink to="/login">Login</NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
