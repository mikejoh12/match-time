import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from "react-redux";
import { createFacility } from '../../features/facilities/facilitiesSlice';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export const AddFacilityDialog = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const [facilityName, setFacilityName] = React.useState('')
  const [facilityDescription, setFacilityDescription] = React.useState('')
  const classes = useStyles()

  const handleClickOpen = () => {
    setOpen(true)
  }
  
  const handleClose = () => {
    setOpen(false)
  }

  const handleAddFacility = () => {
    dispatch(createFacility({
      name: facilityName,
      description: facilityDescription
    }))
    setOpen(false)
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
                autoFocus
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