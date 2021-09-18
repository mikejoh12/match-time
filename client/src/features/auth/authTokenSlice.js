import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
}

export const authTokenSlice = createSlice({
    name: 'authToken',
    initialState,
    reducers: {
        setToken: (state, { payload: { token }}) => {
            state.token = token
        },
    },
})

export const { setToken } = authTokenSlice.actions

export default authTokenSlice.reducer