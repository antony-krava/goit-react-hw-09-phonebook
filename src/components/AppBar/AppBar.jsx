import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { authSelectors } from '../../redux/authorization';
import Navigation from '../Navigation';
import AuthNavigation from '../AuthNavigation';
import UserMenu from '../UserMenu';
import styles from './AppBar.module.css';

export default function AppBar({ isAuthenticated }) {
  const isLoggedIn = useSelector(authSelectors.getIsAuthenticated);

  return (
    <header className={styles.header}>
      <Navigation />

      {isLoggedIn ? <UserMenu /> : <AuthNavigation />}
    </header>
  );
}

AppBar.propTypes = {
  isLoggedIn: PropTypes.bool,
};