import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { authSelectors } from '../../redux/authorization';
import './Navigation.scss';

export default function Navigation() {
  const isLoggedIn = useSelector(authSelectors.getIsAuthenticated);

  return (
    <nav>
      <NavLink
        exact
        to="/"
        className="nav-link"
        activeClassName="active-nav-link"
      >
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink
          exact
          to="/contacts"
          className="nav-link"
          activeClassName="active-nav-link"
        >
          Contacts
        </NavLink>
      )}
    </nav>
  );
}