import ContactForm from '../components/ContactForm/ContactForm';
import Filter from '../components/Filter/Filter';
import ContactList from '../components/ContactList/ContactList';

import { Loader } from 'components/Loader/Loader';
import 'react-toastify/dist/ReactToastify.css';
import { getLoading } from 'redux/contacts/contacts-selectors';
import { useSelector } from 'react-redux';

export default function ContactView() {
  const loading = useSelector(getLoading);
  return (
    <>
      {loading && <Loader />}
      <div>
        <h1>Contacts</h1>
        {/* <h2>Contacts</h2> */}
        <div className="functionContact">
          <ContactForm />
          <Filter />
        </div>

        <ContactList />
      </div>
    </>
  );
}
