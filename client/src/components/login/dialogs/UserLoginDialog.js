import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import { UserLoginForm } from './UserLoginForm'

export const UserLoginDialog = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <UserLoginForm handleClose={handleClose} />
    </Dialog>
  );
};