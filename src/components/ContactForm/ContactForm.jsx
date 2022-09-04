import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from 'components/ContactForm/ContactForm.module.css';
import { toast } from 'react-toastify';
import { addContact } from '../../redux/contacts/contacts-operations';
import { getContacts } from 'redux/contacts/contacts-selectors';
import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ContactForm() {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = e => {
    const { name, value } = e.currentTarget;
    if (name === 'name') {
      setName(value);
    }
    if (name === 'phone') {
      setPhone(value);
    }
    if (name === 'email') {
      setEmail(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const includesContact = contacts.find(c =>
      c.name.toLowerCase().includes(name.toLowerCase())
    );
    if (includesContact !== undefined) {
      toast.warn(`${name} is already in contacts`);
      return;
    }
    dispatch(
      addContact({
        name: name,
        phone: phone,
        email: email,
      })
    );

    setName('');
    setPhone('');
    setEmail('');
    setOpen(false);
  };

  return (
    <div>
      <Fab size="small" color="success" aria-label="add">
        <AddIcon onClick={handleOpen} />
      </Fab>
      <Modal
        className={s.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Add Contact.
          </Typography>
          <form className={s.form} onSubmit={handleSubmit}>
            <div className={s.input}>
              <TextField
                label="Name"
                variant="filled"
                type="text"
                name="name"
                value={name}
                onChange={handleInputChange}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                color="success"
              />
              <TextField
                label="Phone"
                variant="filled"
                type="tel"
                name="phone"
                value={phone}
                onChange={handleInputChange}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                color="success"
              />
              <TextField
                label="Email"
                variant="filled"
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                pattern="([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})"
                // title="Email must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                color="success"
              />
            </div>
            <Button type="submit" variant="outlined" color="success">
              Add contact
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
