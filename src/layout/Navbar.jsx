import React from "react";
import { NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext";

/** Navbar with site navigation links */
export default function Navbar() {
  const { token, logout } = useAuth();

  return (
    <header>
      <NavLink to="/activities">Activities</NavLink>
      {token ? (
        <NavLink onClick={logout} to="/">
          Log out
        </NavLink>
      ) : (
        <>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
        </>
      )}
    </header>
  );
}
