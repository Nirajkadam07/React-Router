import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function HostLayout() {
  const activeStyle = {
    fontWeight: " bold",
    textDecoration: "underline",
    color: "#161616",
  };

  return (
    <>
      <nav className="host-nav">
        <NavLink
          to="/host"
          end
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/host/income"
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
        >
          Income
        </NavLink>
        <NavLink
          to="/host/vans"
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
        >
          Vans
        </NavLink>
        <NavLink
          to="/host/reviews"
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
        >
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}
