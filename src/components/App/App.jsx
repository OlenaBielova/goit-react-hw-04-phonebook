import { useState, useEffect } from 'react';
import { ContactForm } from '../Form/Form';
import { Filter } from '../Filter/Filter';
import { ContactList } from '../ContactList/ContactList';
import { Container } from './App.styled';
import PropTypes from 'prop-types';


export function App(data) {
  const savedContacts = JSON.parse(localStorage.getItem('contacts'));

  const [contacts, setContacts] = useState(savedContacts);
  const [filterValue, setFilterValue] = useState('');

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
    const normalizedFilter = filterValue.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
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
