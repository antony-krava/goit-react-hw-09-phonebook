import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelectors, authOperations } from '../../redux/authorization';
import defaultAvatar from './default-avatar.png';
import styles from './UserMenu.module.css';

export default function UserMenu() {
  const name = useSelector(authSelectors.getUsername);

  const dispatch = useDispatch();
  const onLogout = useCallback(() => dispatch(authOperations.logOut()), [
    dispatch,
  ]);

  return (
    <div className={styles.usermenuContainer}>
      <img src={defaultAvatar} alt="" width="32" className={styles.usermenuAvatar} />

      <span className={styles.username}>Welcome, {name}</span>

      <button type="button" className="btn btn-secondary" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}