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
        logout:  (state) => {}
    },       
})

export const { setCredentials, logout } = authSlice.actions
export const selectCurrentUser = state => state.auth.user

export default authSlice.reducer