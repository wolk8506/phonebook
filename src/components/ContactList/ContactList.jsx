import s from 'components/ContactList/ContactList.module.css';
import {
  fetchContact,
  removeContact,
  favoriteContact,
} from '../../redux/contacts/contacts-operations';
import { useSelector, useDispatch } from 'react-redux';
import { getVisibleContacts } from 'redux/contacts/contacts-selectors';
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function ContactList() {
  const visibleContacts = useSelector(getVisibleContacts);
  const dispatch = useDispatch();
  const onRemoveContact = text => dispatch(removeContact(text));
  const onFavoriteContact = text => dispatch(favoriteContact(text));

  const visibleContactsHref = visibleContacts.map(i => ({
    ...i,
    hrefMail: `mailto:${i.email}`,
    hrefPhone: `tel:${i.phone}`,
  }));

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

  return (
    <ul className={s.list}>
      {visibleContactsHref.map(c => (
        <li className={s.item} key={c._id}>
          <IconButton
            type="button"
            variant="outlined"
            onClick={() => {
              onFavoriteContact({ _id: c._id, favorite: c.favorite });
            }}
          >
            {c.favorite ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>

          <div className={s.item_contacts}>
            <p>{c.name}</p>
            <div className={s.item_communication}>
              <a href={c.hrefPhone}>
                <LocalPhoneIcon className={s.icon} />
                {c.phone}
              </a>
              <a href={c.hrefMail}>
                <EmailIcon className={s.icon} />
                {c.email}
              </a>
            </div>
          </div>

          <IconButton
            type="button"
            variant="outlined"
            onClick={() => {
              onRemoveContact(c._id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </li>
      ))}
    </ul>
  );
}
