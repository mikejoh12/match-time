import React from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDeleteFacilityMutation } from '../../../services/api';
import { showSnackbar } from '../../../features/ui/uiSlice';

export const DeleteFacilityDialog = ({facilityId}) => {
  const history = useHistory()
  const [open, setOpen] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState('')
  const dispatch = useDispatch()

  const [ deleteFacility ] = useDeleteFacilityMutation()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClick = async () => {
    try {
      if (confirmDelete === 'DELETE') {
          await deleteFacility(facilityId)
          dispatch(showSnackbar({
            message: `Facility deleted.`,
            severity: 'success'
            }))
          setOpen(false)
          history.push('/manager-dashboard')
      } else {
        dispatch(showSnackbar({
          message: `You did not enter DELETE`,
          severity: 'info'
          }))
      }
    } catch (err) {
      dispatch(showSnackbar({
        message: err.data?.error?.data,
        severity: 'error'
      }))
    }
  }

  const handleConfirmDeleteChange = event => setConfirmDelete(event.target.value)

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
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
          <Button onClick={handleClose} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleDeleteClick} color="secondary" variant="contained">
            Delete Facility
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}