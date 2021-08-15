import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { useCreateResourceMutation } from '../../services/api';
import { showSnackbar } from '../../features/ui/uiSlice';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from "react-hook-form";

export const AddResourceDialog = ({facilityId}) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()
  const { control, handleSubmit } = useForm()
  
  const [ createResource ] = useCreateResourceMutation()

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleAddResource = async data => {
    const { resourceName, resourceDescription } = data
    try {
      await createResource({
          facilities_id: facilityId,
          resource_name: resourceName,
          description: resourceDescription
      }).unwrap()
      dispatch(showSnackbar({
        message: `Resource added: ${resourceName}`,
        severity: 'success'
        }))
    } catch (err) {
      dispatch(showSnackbar({
        message: 'There was a problem adding the resource',
        severity: 'error'
      }))
    } finally {
      setOpen(false)
    }
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add a Resource
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(handleAddResource)}>
          <DialogTitle id="resource-form-dialog-title">Add a Resource</DialogTitle>
          <DialogContent>
            <Controller
              name="resourceName"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                    autoFocus
                    fullWidth
                    margin="dense"
                    label="Resource name"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                />
              )}
              rules={{ required: 'Resource name required' }}
            />
            <Controller
              name="resourceDescription"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                  fullWidth
                  margin="dense"
                  label="Resource description"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
              />
              )}
              rules={{ required: 'Resource description required' }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add Resource
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}