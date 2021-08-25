import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import { UserRegisterForm } from './UserRegisterForm'

export const UserRegisterDialog = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <UserRegisterForm handleClose={handleClose} />
    </Dialog>
  );
};