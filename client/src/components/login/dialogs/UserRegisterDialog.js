import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import { UserRegisterForm } from './UserRegisterForm'
import { useDispatch, useSelector } from 'react-redux';
import { closeRegisterDialog, selectRegisterDialogOpen } from '../../../features/ui/uiSlice';

export const UserRegisterDialog = () => {
  const dispatch = useDispatch()

  const registerDialogOpen = useSelector(selectRegisterDialogOpen)

  const handleClose = () => dispatch(closeRegisterDialog())

  return (
    <Dialog open={registerDialogOpen} onClose={handleClose}>
      <UserRegisterForm handleClose={handleClose} />
    </Dialog>
  );
};