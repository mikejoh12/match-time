import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button';
import { UserLoginForm } from './UserLoginForm'
import { useHistory } from 'react-router-dom'

export const UserLoginDialog = ({ open, handleClose }) => {
  const history = useHistory()

  const handlePasswordReset = () => {
    handleClose();
    history.push('/password-reset');
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <UserLoginForm handleClose={handleClose} />
      <Button size="small" color="primary" onClick={handlePasswordReset}>
        Forgot password
      </Button>
    </Dialog>
  );
};