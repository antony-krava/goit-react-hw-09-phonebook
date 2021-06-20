import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contactsActions, contactsSelectors } from '../../redux/phonebook';
import styles from './Filter.module.css';

export default function Filter() {
  const value = useSelector(contactsSelectors.getFilter);
  const dispatch = useDispatch();
  const onChange = event =>
    dispatch(contactsActions.changeFilter(event.target.value));

  return (
    <>
      <h3 className={styles.title}>Find contact by name</h3>
      <input
        type="text"
        className={styles.input}
        value={value}
        onChange={onChange}
      />
    </>
  );
}