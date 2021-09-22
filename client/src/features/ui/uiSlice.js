import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    snackbarOpen: false,
    snackbarMessage: {
      message: '',
      severity: '',
    },
    bookDialogOpen: false,
    deleteBookingDialogOpen: false,
    bookingIdToDelete: null,
    deleteResourceDialogOpen: false,
    resourceIdToDelete: null,
    inviteMemberDialogOpen: false,
    registerDialogOpen: false,
    loginDialogOpen: false
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
      showSnackbar(state, action) {
            state.snackbarOpen = true
            state.snackbarMessage = action.payload
      },
      clearSnackbar(state, action) {
            state.snackbarOpen = false
      },
      openBookDialog(state, action) {
            state.bookDialogOpen = true
      },
      closeBookDialog(state, action) {
            state.bookDialogOpen = false
      },
      openDeleteBookingDialog(state, action) {
            state.deleteBookingDialogOpen = true
            state.bookingIdToDelete = action.payload
      },
      closeDeleteBookingDialog(state, action) {
            state.deleteBookingDialogOpen = false
            state.bookingIdToDelete = null
      },
      openDeleteResourceDialog(state, action) {
            state.deleteResourceDialogOpen = true
            state.resourceIdToDelete = action.payload
      },
      closeDeleteResourceDialog(state, action) {
            state.deleteResourceDialogOpen = false
            state.resourceIdToDelete = null
      },
      openInviteMemberDialog(state, action) {
            state.inviteMemberDialogOpen = true
      },
      closeInviteMemberDialog(state, action) {
            state.inviteMemberDialogOpen = false
      },
      openRegisterDialog(state, action) {
            state.registerDialogOpen = true
      },
      closeRegisterDialog(state, action) {
            state.registerDialogOpen = false
      },
      openLoginDialog(state, action) {
            state.loginDialogOpen = true
      },
      closeLoginDialog(state, action) {
            state.loginDialogOpen = false
      }
    }
})

export const {    showSnackbar, clearSnackbar, openBookDialog, closeBookDialog,
                  openDeleteBookingDialog, closeDeleteBookingDialog,
                  openDeleteResourceDialog, closeDeleteResourceDialog,
                  openInviteMemberDialog, closeInviteMemberDialog,
                  openRegisterDialog, closeRegisterDialog,
                  openLoginDialog, closeLoginDialog } = uiSlice.actions

export const selectSnackBarOpen = state => state.ui.snackbarOpen
export const selectSnackbarMessage = state => state.ui.snackbarMessage
export const selectBookDialogOpen = state => state.ui.bookDialogOpen
export const selectDeleteBookingDialogOpen = state => state.ui.deleteBookingDialogOpen
export const selectBookingIdToDelete = state => state.ui.bookingIdToDelete
export const selectDeleteResourceDialogOpen = state => state.ui.deleteResourceDialogOpen
export const selectResourceIdToDelete = state => state.ui.resourceIdToDelete
export const selectInviteMemberDialogOpen = state => state.ui.inviteMemberDialogOpen
export const selectRegisterDialogOpen = state => state.ui.registerDialogOpen
export const selectLoginDialogOpen = state => state.ui.loginDialogOpen
export default uiSlice.reducer