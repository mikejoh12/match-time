import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiAxios from '../../config/axiosConfig'
import { zonedTimeToUtc } from 'date-fns-tz'
import { roundToNearestMinutes } from 'date-fns'

export const fetchBookings = createAsyncThunk('facilities/fetchBookings',
    async id => {
        const response = await apiAxios.get(`/bookings/by_facility/${id}`)
        // Normalize bookings as arrays in an object stored using resources keys
        const bookings = {}
        response.data.forEach(booking => {
          if (!bookings[booking.resources_id]) {
            bookings[booking.resources_id] = []
        }
          bookings[booking.resources_id].push(booking)
        });
        return bookings
})

export const fetchBookingsByUser = createAsyncThunk('facilities/fetchBookingsByUser',
    async id => {
        const response = await apiAxios.get(`/bookings/by_user/${id}`)
        // Return an array of bookings for a user id
        return response.data
})

const initialState = {
  fetchBookingsStatus: 'idle',
  fetchBookingsByUser: 'idle',
  bookings: {},
  calViewDate: zonedTimeToUtc(roundToNearestMinutes(new Date(), { nearestTo: 30 }), 'UTC').toISOString(),
  court: '',
  bookingsByUser: []
}

export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
      calViewDateUpdated(state, action) {
          state.calViewDate = action.payload
      },
      courtUpdated(state, action) {
        state.court = action.payload
      }
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
          [fetchBookingsByUser.pending]: (state, action) => {
            state.fetchBookingsByUserStatus = 'loading'
          },
          [fetchBookingsByUser.fulfilled]: (state, action) => {
            state.fetchBookingsByUserStatus = 'succeeded'
            state.bookingsByUser = action.payload
          },
          [fetchBookingsByUser.rejected]: (state, action) => {
            state.fetchBookingsByUserStatus = 'failed'
          },          
    }
})

export const { calViewDateUpdated, courtUpdated } = bookingsSlice.actions
export const selectBookings = state => state.bookings.bookings
export const selectBookingsByUser = state => state.bookings.bookingsByUser
export const selectFetchBookingsStatus = state => state.bookings.fetchBookingsStatus
export const selectCalViewDate = state => state.bookings.calViewDate
export const selectCourt = state => state.bookings.court

export default bookingsSlice.reducer