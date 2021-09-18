import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  refreshToken: null,
}

export const authRefreshSlice = createSlice({
    name: 'authRefresh',
    initialState,
    reducers: {
        setRefreshToken: (state, { payload: {refreshToken }}) => {
            state.refreshToken = refreshToken
        },
    },
})

export const { setRefreshToken } = authRefreshSlice.actions

export default authRefreshSlice.reducer