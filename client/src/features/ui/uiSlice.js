import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    successSnackbarOpen: false,
    successSnackbarMessage: ''
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
      showSuccessSnackbar(state, action) {
            state.successSnackbarOpen = true
            state.successSnackbarMessage = action.payload
      },
      clearSnackbar(state, action) {
            state.successSnackbarOpen = false
      }
    }
})

export const { showSuccessSnackbar, clearSnackbar } = uiSlice.actions

export const selectSuccessSnackBarOpen = state => state.ui.successSnackbarOpen
export const selectSuccessSnackbarMessage = state => state.ui.successSnackbarMessage

export default uiSlice.reducer