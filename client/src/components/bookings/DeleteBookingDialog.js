import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { selectDeleteBookingDialogOpen, closeDeleteBookingDialog, selectBookingIdToDelete, showSnackbar } from '../../features/ui/uiSlice';
import { useDispatch, useSelector } from 'react-redux'
import { useDeleteBookingMutation } from '../../services/api'


export const DeleteBookingDialog = () => {
    const deleteBookingDialogOpen = useSelector(selectDeleteBookingDialogOpen)
    const bookingIdToDelete = useSelector(selectBookingIdToDelete)
    const dispatch = useDispatch()

    const [ deleteBooking ] = useDeleteBookingMutation()

    const handleClose = () => dispatch(closeDeleteBookingDialog())

    const handleDeleteClick = async() => {
        try {
            await deleteBooking(bookingIdToDelete)
            dispatch(showSnackbar({
                message: `Booking deleted`,
                severity: 'success'
              }))
        } catch(err) {
            dispatch(showSnackbar({
                message: err.data?.error?.data,
                severity: 'error'
              }))
        } finally {
            dispatch(closeDeleteBookingDialog())
        }
    };

    return (
        <div>
        <Dialog
            open={deleteBookingDialogOpen}
            onClose={handleClose}
        >
            <DialogTitle id="delete-booking-dialog-title">{"Delete booking?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Please confirm that you want to delete booking with id {bookingIdToDelete}.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleDeleteClick} color="primary" autoFocus>
                Delete Booking
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}