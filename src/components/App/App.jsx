import { useState, useEffect } from 'react';
import { ContactForm } from '../Form/Form';
import { Filter } from '../Filter/Filter';
import { ContactList } from '../ContactList/ContactList';
import { Container } from './App.styled';
import PropTypes from 'prop-types';

export function App(data) {
  const [contacts, setContacts] = useState([]);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    setContacts(parsedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleFormSubmit = data => {
    const normalizedName = data.name.toLowerCase();
    const repeatedNameList = contacts.filter(
      contact => contact.name.toLowerCase() === normalizedName
    );
    repeatedNameList.length === 0
      ? setContacts([...contacts, data])
      : alert(`${data.name} is already in contacts`);
  };

  const handleSearchInputChange = e => {
    setFilterValue(e.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filterValue.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return filteredContacts;
  };

  const deleteContact = ID => {
    setContacts(contacts.filter(contact => contact.id !== ID));
  };

  const filteredContacts = getFilteredContacts();
  return (
    <Container>
      <h3>Phonebook</h3>
      <ContactForm onSubmit={handleFormSubmit} />
      <h3>Contacts</h3>
      <Filter value={filterValue} onChange={handleSearchInputChange} />
      {filteredContacts.length > 0 && (
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={deleteContact}
        />
      )}
    </Container>
  );
}

App.propTypes = {
  data: PropTypes.exact({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
};
