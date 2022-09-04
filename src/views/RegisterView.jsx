import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from '../redux/auth';
import s from '../css/RegisterView.module.css';
import { toast } from 'react-toastify';

import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import * as React from 'react';
import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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

export default function RegisterView() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resendEmail, setResendEmail] = useState();
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      case 'confirmPassword':
        return setConfirmPassword(value);
      case 'resendEmail':
        return setResendEmail(value);
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (password.length < 6) {
      toast.warn('Password must not be less than 6 characters');
      setPassword('');
      setConfirmPassword('');
      return;
    }
    if (password !== confirmPassword) {
      toast.warn('Passwords do not match, please re-enter your password');
      setPassword('');
      setConfirmPassword('');
      return;
    }
    dispatch(authOperations.register({ name, email, password }));
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const OnSumbit = e => {
    e.preventDefault();
    dispatch(authOperations.verifyEmail({ email: resendEmail }));
    setOpen(false);
    setResendEmail('');
  };

  return (
    <div>
      <h1>Registration page</h1>

      <form onSubmit={handleSubmit} className={s.form} autoComplete="off">
        <TextField
          className={s.inputText}
          label="Name"
          variant="standard"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          color="success"
        />

        <TextField
          className={s.inputText}
          label="Email"
          variant="standard"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          color="success"
        />

        <FormControl color="success" sx={{ width: '320' }} variant="standard">
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl color="success" sx={{ width: '320' }} variant="standard">
          <InputLabel htmlFor="confirmPassword">Сonfirm password</InputLabel>
          <Input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <Button type="submit" variant="outlined" color="success">
          Register
        </Button>
      </form>
      <button className={s.btnFormResend} onClick={handleOpen}>
        I didn't receive a confirmation email
      </button>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              To resend the verification email, enter your email specified at
              registration.
            </Typography>
            <div className={s.blockResend}>
              <TextField
                id="resendEmail"
                label="Email"
                variant="standard"
                type="email"
                name="resendEmail"
                onChange={handleChange}
              />

              <Button onClick={OnSumbit}>to send email</Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
