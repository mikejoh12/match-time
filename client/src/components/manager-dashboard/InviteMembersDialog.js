import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { closeInviteMemberDialog, openInviteMemberDialog, selectInviteMemberDialogOpen } from '../../features/ui/uiSlice';
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from "react-hook-form";
import { useInviteUserMutation } from '../../services/api';
import { showSnackbar } from '../../features/ui/uiSlice';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

export const InviteMembersDialog = ({facilityId}) => {
  const classes = useStyles()
  const inviteMemberDialogOpen = useSelector(selectInviteMemberDialogOpen)
  const dispatch = useDispatch()
  
  const { control, handleSubmit, watch } = useForm()
  const inviteEmail = useRef({})
  inviteEmail.current = watch("inviteEmail", "")

  const handleClickOpen = () => dispatch(openInviteMemberDialog())
  const handleClose = () => dispatch(closeInviteMemberDialog())

  const [ inviteUser ] = useInviteUserMutation()

  const handleInvite = async data => {
    const { inviteEmail } = data
    try {
      await inviteUser({inviteEmail, facilityId}).unwrap()
      dispatch(showSnackbar({
        message: `User invited. Email sent to: ${inviteEmail}`,
        severity: 'success'
      }))
    } catch (err) {
      dispatch(showSnackbar({
        message: 'There was a problem sending email invite.',
        severity: 'error'
      }))
    } finally {
      dispatch(closeInviteMemberDialog())
    }
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Invite Member
      </Button>
      <Dialog open={inviteMemberDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form className={classes.root} onSubmit={handleSubmit(handleInvite)}>
        <DialogTitle id="form-dialog-title">Invite Member:</DialogTitle>
        
        <Controller
          name="inviteEmail"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Email"
              variant="filled"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              type="email"
            />
        )}
        rules={{ required: 'Email required' }}
      />

        <Controller
          name="confirmEmail"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Confirm Email"
              variant="filled"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              type="email"
            />
        )}
        rules={{  required: 'Email required',
                  validate: value =>
                    value === inviteEmail.current || 'The emails do not match'
              }}
        />  

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Invite
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}