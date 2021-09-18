import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null
}

export const authUserSlice = createSlice({
    name: 'authUser',
    initialState,
    reducers: {
        setCredentials: (state, { payload: { user, token }}) => {
            state.user = user
            state.token = token
        },
        logout() {}
    },  
})

export const { setCredentials, logout } = authUserSlice.actions
export const selectCurrentUser = state => state.authUser.user

export default authUserSlice.reducer