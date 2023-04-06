import css from './ContactList.module.css';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { getFilter } from 'redux/contacts/selectors';
import { useFetchContactsQuery } from "redux/contacts/api";
import { Oval } from 'react-loader-spinner';
import { ContactListItem } from './ContactListItem'

export const ContactList = () => {
    const [isBlock, setIsBlock] = useState(false);
    const filter = useSelector(getFilter);
    const { data: contacts = [], isFetching } = useFetchContactsQuery();

    const getVisibleContacts = () => {
        const normalizedFilter = filter.toLowerCase();
        return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
    }

    return (<div className={css.wraperContactList}>
        <ul className={css.contactList}>
            {isFetching ? <Oval
                height="40"
                width="40"
                radius="9"
                color="#000000"
                ariaLabel="three-dots-loading"
                visible={true}
            /> : getVisibleContacts().map((contact, index) => (
                <li key={index} className={css.contactListItem}>
                    <ContactListItem
                        contact={contact}
                        isBlock={isBlock}
                        setIsBlock={setIsBlock}
                        contacts={getVisibleContacts()}
                    />
                </li>

            ))}
        </ul>
    </div>)
}