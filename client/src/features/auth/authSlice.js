import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, { payload: { user, token }}) => {
            state.user = user
            state.token = token
        },
        removeCredentials:  (state) => {
            state.user = null
            state.token = null
        }
    },       
})

export const { setCredentials, removeCredentials } = authSlice.actions
export const selectCurrentUser = state => state.auth.user

export default authSlice.reducer