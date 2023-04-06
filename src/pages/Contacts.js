// import { Helmet } from 'react-helmet';
import { ContactForm } from 'components/ContactForm/ContactForm.jsx';
import { Filter } from 'components/Filter/Filter.jsx';
import { ContactList } from 'components/ContactList/ContactList.jsx';

export default function Contacts() {

    return (
        <>
            {/* <Helmet>
                <title>Your contacts</title>
            </Helmet> */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 20,
                    color: '#010101',
                }}
            >

                <h1>Phonebook</h1>
                <ContactForm />
                <h1>Contacts</h1>
                <Filter />
                <ContactList />
            </div >
        </>
    );
}
