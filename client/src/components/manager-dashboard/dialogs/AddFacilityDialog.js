import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { useCreateFacilityMutation } from '../../../services/api'
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../../../features/ui/uiSlice';
import { useForm, Controller } from "react-hook-form";

export const AddFacilityDialog = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm()

  const [ createFacility ] = useCreateFacilityMutation()

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleAddFacility = async data => {
    const { facilityName, facilityDescription } = data
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
      console.log(err)
      dispatch(showSnackbar({
        message: err.data?.error || 'There was a problem when adding facility.',
        severity: 'error'
      }))
    } finally {
      setOpen(false)
    }
  }

  return (
    <div>
      <Button data-testid='add-facility-button' variant="contained" color="secondary" onClick={handleClickOpen}>
        Add a Facility
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(handleAddFacility)}>
          <DialogTitle id="facility-form-dialog-title">Add a Facility</DialogTitle>
          <DialogContent>
            <Controller
              name="facilityName"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                    autoFocus
                    fullWidth
                    margin="dense"
                    label="Facility name"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    inputProps={{"data-testid":"add-facility-name"}}
                />
              )}
              rules={{ required: 'Facility name required' }}
              />
            <Controller
              name="facilityDescription"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                    fullWidth
                    margin="dense"
                    label="Facility description"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    inputProps={{"data-testid":"add-facility-description"}}
                />
              )}
              rules={{ required: 'Facility description required' }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button data-testid='add-facility-submit' type="submit" color="primary">
              Add Facility
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}