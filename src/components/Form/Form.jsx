import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import 'yup-phone-lite';
import {
  NewContactForm,
  NameInput,
  NumberInput,
  AddBtn,
  Error,
} from './Form.styled';

export function ContactForm({ onSubmit }) {
  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    number: yup
      .string()
      .phone('UA', 'Please enter a valid phone number')
      .required('A phone number is required'),
  });

  const initialValues = {
    name: '',
    number: '',
    id: '',
  };

  const handleSubmit = (values, { resetForm }) => {
    const newContact = {
      ...values,
      id: nanoid(),
    };
    onSubmit(newContact);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <NewContactForm autoComplete="off">
        <label>
          {' '}
          Name{' '}
          <NameInput
            type="text"
            placeholder="Mia Fiona"
            name="name"
            // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            // title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <Error>
            <ErrorMessage name="name" />
          </Error>
        </label>
        <br />
        <label>
          {' '}
          Number{' '}
          <NumberInput
            type="tel"
            placeholder="+38011 111 11 11"
            name="number"
            // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            // title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <Error>
            <ErrorMessage name="number" />
          </Error>
        </label>
        <br />
        <AddBtn type="submit">Add</AddBtn>
      </NewContactForm>
    </Formik>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};
