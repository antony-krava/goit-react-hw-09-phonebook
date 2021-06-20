import React, { Component } from 'react';
import { connect } from 'react-redux';
import { contactsOperations, contactsSelectors } from '../redux/phonebook';
import ContactsForm from '../components/ContactsForm';
import Filter from '../components/Filter';
import ContactList from '../components/ContactList';
import styles from '../components/ContactList/ContactList.module.css';

class ContactsPage extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    return (
      <div className="App">
        <h2 className={styles.title}>Contacts</h2>

        <ContactsForm />

        <Filter />

        {this.props.isLoadingContacts && <h2>Loading...</h2>}

        <ContactList />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoadingContacts: contactsSelectors.getLoading(state),
});

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(contactsOperations.fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsPage);