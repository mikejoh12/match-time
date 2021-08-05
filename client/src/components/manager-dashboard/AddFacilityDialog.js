import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { useCreateFacilityMutation } from '../../services/api'
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../../features/ui/uiSlice';

export const AddFacilityDialog = () => {
  const [open, setOpen] = React.useState(false);
  const [facilityName, setFacilityName] = React.useState('')
  const [facilityDescription, setFacilityDescription] = React.useState('')
  const dispatch = useDispatch();

  const [ createFacility ] = useCreateFacilityMutation()

  const handleClickOpen = () => {
    setOpen(true)
  }
  
  const handleClose = () => {
    setOpen(false)
  }

  const handleAddFacility = async () => {
    try {
      await createFacility({
        name: facilityName,
        description: facilityDescription
      }).unwrap()
      dispatch(showSnackbar({
        message: `Facility ${facilityName} Created`,
        severity: 'success'
        }))
    } catch (err) {
      dispatch(showSnackbar({
        message: 'There was a problem when adding facility.',
        severity: 'error'
      }))
    } finally {
      setOpen(false)
    }
  }

  const handleFacilityNameChange = event => setFacilityName(event.target.value)
  const handleFacilityDescriptionChange = event => setFacilityDescription(event.target.value)

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add a Facility
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a Facility</DialogTitle>
        <DialogContent>
            <TextField
                onChange={handleFacilityNameChange}
                autoFocus
                margin="dense"
                id="facility-name"
                label="Facility name"
                fullWidth
            />
            <TextField
                onChange={handleFacilityDescriptionChange}
                margin="dense"
                id="facility-description"
                label="Facility description"
                fullWidth
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddFacility} color="primary">
            Add Facility
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}