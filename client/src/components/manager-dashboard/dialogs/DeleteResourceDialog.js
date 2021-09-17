import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { selectDeleteResourceDialogOpen, closeDeleteResourceDialog, selectResourceIdToDelete, showSnackbar } from '../../../features/ui/uiSlice';
import { useDispatch, useSelector } from 'react-redux'
import { useDeleteResourceMutation } from '../../../services/api'


export const DeleteResourceDialog = ({facilityId}) => {
    const deleteResourceDialogOpen = useSelector(selectDeleteResourceDialogOpen)
    const resourceIdToDelete = useSelector(selectResourceIdToDelete)
    const dispatch = useDispatch()

    const [ deleteResource ] = useDeleteResourceMutation()

    const handleClose = () => dispatch(closeDeleteResourceDialog())

    const handleDeleteClick = async() => {
        try {
            await deleteResource({
                id: facilityId,
                resource_id: resourceIdToDelete
            })
            dispatch(showSnackbar({
                message: `Resource deleted`,
                severity: 'success'
              }))
        } catch(err) {
            dispatch(showSnackbar({
                message: err.data?.error?.data,
                severity: 'error'
              }))
        } finally {
            dispatch(closeDeleteResourceDialog())
        }
    };

    return (
        <div>
        <Dialog
            open={deleteResourceDialogOpen}
            onClose={handleClose}
        >
            <DialogTitle id="delete-resource-dialog-title">{"Delete resource?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Please confirm that you want to delete resource with id {resourceIdToDelete}.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleDeleteClick} color="primary" autoFocus>
                Delete Resource
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}