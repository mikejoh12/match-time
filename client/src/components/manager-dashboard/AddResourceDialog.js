import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { useCreateResourceMutation } from '../../services/api';

export const AddResourceDialog = props => {
  const [open, setOpen] = React.useState(false);
  const [resourceName, setResourceName] = React.useState('')
  const [resourceDescription, setResourceDescription] = React.useState('')

  const [
    createResource,
    { isLoading: isUpdating }, // This is the destructured mutation result
  ] = useCreateResourceMutation()

  const handleClickOpen = () => {
    setOpen(true)
  }
  
  const handleClose = () => {
    setOpen(false)
  }

  const handleAddResource = () => {
    createResource({
        facilities_id: props.facilityId,
        name: resourceName,
        description: resourceDescription
    })
    setOpen(false)
  }

  const handleResourceNameChange = event => setResourceName(event.target.value)
  const handleResourceDescriptionChange = event => setResourceDescription(event.target.value)

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add a Resource
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a Resource</DialogTitle>
        <DialogContent>
            <TextField
                onChange={handleResourceNameChange}
                autoFocus
                margin="dense"
                id="resource-name"
                label="Resource name"
                fullWidth
            />
            <TextField
                onChange={handleResourceDescriptionChange}
                margin="dense"
                id="resource-description"
                label="Resource description"
                fullWidth
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddResource} color="primary">
            Add Resource
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}