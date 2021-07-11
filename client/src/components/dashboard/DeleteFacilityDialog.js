import React from 'react';
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux'
import { deleteFacility } from '../../features/facilities/facilitiesSlice';

export const DeleteFacilityDialog = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [open, setOpen] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClick = () => {
      if (confirmDelete === 'DELETE') {
          console.log(`Delete Facility with id ${props.facilityId}`)
          dispatch(deleteFacility(props.facilityId))
          setOpen(false)
          history.push('/manager-dashboard')

      } else {
          console.log('You did not enter DELETE')
      }
  }

  const handleConfirmDeleteChange = event => setConfirmDelete(event.target.value)

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Delete This Facility
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delete Facility</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To delete this facility, type the word DELETE and press the Delete Facility button.
          </DialogContentText>
          <TextField
            onChange={handleConfirmDeleteChange}
            autoFocus
            margin="dense"
            id="name"
            label="Enter the word DELETE below"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteClick} color="primary">
            Delete Facility
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}