import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  refreshToken: null
}

export const authUserSlice = createSlice({
    name: 'authUser',
    initialState,
    reducers: {
        setCredentials: (state, { payload: { user, refreshToken }}) => {
            state.user = user
            state.refreshToken = refreshToken
        },
        logout:  (state) => {}
    },       
})

export const { setCredentials, logout } = authUserSlice.actions
export const selectCurrentUser = state => state.authUser.user

export default authUserSlice.reducer