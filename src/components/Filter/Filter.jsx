import { changeFilter } from '../../redux/contacts/contacts-actions';
import { useSelector, useDispatch } from 'react-redux';
import { getFilter } from 'redux/contacts/contacts-selectors';
import { TextField } from '@mui/material';

export default function Filter() {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const onChange = e => dispatch(changeFilter(e.target.value));

  return (
    <TextField
      id="standard-basic"
      label="Find contacts by name"
      variant="standard"
      type="text"
      name="filter"
      value={filter}
      onChange={onChange}
      title="filter"
      color="success"
    />
  );
}
