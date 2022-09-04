import { useDispatch, useSelector } from 'react-redux';
import { authSelectors, authOperations } from '../../redux/auth';
import s from '../../css/AppBar.module.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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

export default function UserMenu() {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUsername);
  const avatar = useSelector(authSelectors.getAvatar);
  const [avatarUrl, setAvatarUrl] = useState();
  const [file, setFile] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (avatar.slice(0, 6) === 'public') {
      setAvatarUrl(`https://contact-rest-api.herokuapp.com/${avatar.slice(7)}`);
    } else setAvatarUrl(avatar);
  }, [avatar]);

  const UploadContent = e => {
    e.preventDefault();
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const OnSumbit = e => {
    const formData = new FormData();
    formData.append('avatar', file);

    dispatch(
      authOperations.updateAvatar(formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      })
    );
    setOpen(false);
  };
  return (
    <>
      <div className={s.userBlock}>
        <Button onClick={handleOpen}>
          <img src={avatarUrl} alt="" width="32" className={s.avatar} />
        </Button>

        <span className={s.name}>Welcome, {name}</span>
        <Button
          type="button"
          variant="outlined"
          color="success"
          onClick={() => dispatch(authOperations.logOut())}
        >
          LogOut
        </Button>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Change avatar
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              To change the avatar, select the file
            </Typography>

            {/* <input
              accept="image/png"
              multiple
              type="file"
              onChange={UploadContent}
            /> */}
            <TextField
              id="avatar"
              variant="standard"
              name="avatar"
              accept="image/png"
              type="file"
              onChange={UploadContent}
              color="success"
            />
            <Button type="submit" onClick={OnSumbit}>
              Change
            </Button>
          </Box>
        </Modal>
      </div>
    </>
  );
}
