import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contactsOperations, contactsSelectors } from '../../redux/phonebook';
import styles from './ContactsForm.module.css';

export default function ContactsForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(contactsSelectors.getAllContacts);
  const dispatch = useDispatch();
  const handleChange = useCallback(event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        console.warn(`Тип поля name - ${name} не обрабатывается`);
    }
  }, []);

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();

      if (contacts.some(elm => elm.name.toLowerCase() === name.toLowerCase())) {
        return alert(`${name} is already in contacts`);
      }
      if (
        contacts.some(elm => elm.number.toLowerCase() === number.toLowerCase())
      ) {
        return alert(`${number} is already in contacts`);
      }

      dispatch(contactsOperations.addContact({ name, number }));

      setName('');
      setNumber('');
    },
    [dispatch, contacts, name, number],
  );

  return (
    <form onSubmit={handleSubmit} className={styles.contactForm}>
      <label className={styles.label}>Name</label>
      <input
        className={styles.input}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
        required
        value={name}
        onChange={handleChange}
      />

      <label className={styles.labelNumber}>Number</label>
      <input
        className={styles.input}
        type="tel"
        name="number"
        pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
        title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
        required
        value={number}
        onChange={handleChange}
      />

      <button type="submit" className={styles.button}>
        Add Contact
      </button>
    </form>
  );
}