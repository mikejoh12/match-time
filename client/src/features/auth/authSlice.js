import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  refreshToken: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, { payload: { user, refreshToken }}) => {
            state.user = user
            state.refreshToken = refreshToken
        },
        logout:  (state) => {}
    },       
})

export const { setCredentials, logout } = authSlice.actions
export const selectCurrentUser = state => state.auth.user

export default authSlice.reducer