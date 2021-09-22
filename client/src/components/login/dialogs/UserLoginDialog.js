import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button';
import { UserLoginForm } from './UserLoginForm'
import { useHistory } from 'react-router-dom'
import { closeLoginDialog, selectLoginDialogOpen } from '../../../features/ui/uiSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export const UserLoginDialog = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const loginDialogOpen=useSelector(selectLoginDialogOpen)

  const handlePasswordReset = () => {
    dispatch(closeLoginDialog());
    history.push('/password-forgot');
  }

  const handleClose = () => dispatch(closeLoginDialog())

  return (
    <Dialog open={loginDialogOpen} onClose={handleClose}>
      <UserLoginForm />
      <Button data-testid='forgot-password-button' size="small" color="secondary" onClick={handlePasswordReset}>
        Forgot password
      </Button>
    </Dialog>
  );
};