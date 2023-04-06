import css from './ContactForm.module.css';
import React, { useState } from 'react';
import { useAddContactMutation, useFetchContactsQuery } from "redux/contacts/api";

export const ContactForm = () => {
    const { data: contacts } = useFetchContactsQuery();
    const [addContact] = useAddContactMutation();
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleChange = e => {
        const { name, value } = e.currentTarget;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value)
                break;
            default:
                return
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        const findContact = contacts.find(contact => contact.name === name);
        if (findContact) {
            alert(findContact.name + " is already in contacts.")
            return;
        }
        addContact({ name, number });
        e.target.reset();
    }

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <label className={css.formLabel}>Name
                <input className={css.formName}
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    onChange={handleChange}
                    required
                />
            </label>

            <label className={css.formLabel}>Number
                <input className={css.formNumber}
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    onChange={handleChange}
                    required
                />
            </label>
            <button className={css.formBtn} type='submit'> Add contact</button>
        </form>
    )
}
