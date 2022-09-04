import React from 'react';
import { NavLink } from 'react-router-dom';
import s from '../css/AppBar.module.css';

export default function AuthNav() {
  return (
    <div>
      <NavLink
        to="/register"
        className={({ isActive }) => (isActive ? s.activeLink : s.link)}
      >
        Registration
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) => (isActive ? s.activeLink : s.link)}
      >
        Login
      </NavLink>
    </div>
  );
}
