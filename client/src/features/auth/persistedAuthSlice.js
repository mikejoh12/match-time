import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
}

export const persistedAuthSlice = createSlice({
    name: 'persistedAuth',
    initialState,
    reducers: {
        setToken: (state, { payload: { token }}) => {
            state.token = token
        },
    },
})

export const { setToken } = persistedAuthSlice.actions

export default persistedAuthSlice.reducer