import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    snackbarOpen: false,
    snackbarMessage: {
      message: '',
      severity: '',
    },
    bookDialogOpen: false
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
      }
    }
})

export const { showSnackbar, clearSnackbar, openBookDialog, closeBookDialog } = uiSlice.actions

export const selectSnackBarOpen = state => state.ui.snackbarOpen
export const selectSnackbarMessage = state => state.ui.snackbarMessage
export const selectBookDialogOpen = state => state.ui.bookDialogOpen

export default uiSlice.reducer