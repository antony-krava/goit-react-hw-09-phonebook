import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { contactsOperations, contactsSelectors } from '../../redux/phonebook';
import styles from './ContactList.module.css';

export default function ContactList() {
  const contacts = useSelector(contactsSelectors.getFilteredContacts);
  const dispatch = useDispatch();
  const onDeleteContact = id => dispatch(contactsOperations.deleteContact(id));

  return (
    <ul className={styles.ContactsList}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={styles.ContactsItem}>
          {name}: {number}
          <button
            type="button"
            className={styles.ContactsBtn}
            onClick={() => {
              onDeleteContact(id);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
};