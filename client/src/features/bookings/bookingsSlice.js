import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiAxios from '../../config/axiosConfig'

export const fetchBookings = createAsyncThunk('facilities/fetchBookings',
    async id => {
        const response = await apiAxios.get(`/bookings/by_facility/${id}`)
        return response.data
})

export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: {
        fetchBookingsStatus: 'idle',
        bookings: []
    },
    extraReducers: {
        [fetchBookings.pending]: (state, action) => {
            state.fetchBookingsStatus = 'loading'
          },
          [fetchBookings.fulfilled]: (state, action) => {
            state.fetchBookingsStatus = 'succeeded'
            state.bookings = action.payload
          },
          [fetchBookings.rejected]: (state, action) => {
            state.fetchBookingsStatus = 'failed'
          },
    }
})

export const selectBookings = state => state.bookings.bookings

export default bookingsSlice.reducer