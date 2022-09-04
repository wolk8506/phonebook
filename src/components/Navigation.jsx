import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { authSelectors } from 'redux/auth';
import s from '../css/AppBar.module.css';

const Navigation = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return (
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? s.activeLink : s.link)}
      >
        Main
      </NavLink>
      {isLoggedIn && (
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? s.activeLink : s.link)}
        >
          Contact
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
