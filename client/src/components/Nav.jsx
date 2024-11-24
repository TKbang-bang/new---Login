import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/profile"}>Profile</NavLink>
        </li>
        <li>
          <NavLink to={"/others"}>Other users</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
