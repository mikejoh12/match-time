import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiAxios from '../../config/axiosConfig'
import { zonedTimeToUtc } from 'date-fns-tz'

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

export const createBooking = createAsyncThunk('bookings/createBooking',
    async ({resources_id, organizer_id, start_time, end_time}) => {
        const response = await apiAxios.post(
          '/bookings',
          {
              resources_id,
              organizer_id,
              start_time,
              end_time
          })
          console.log(response.data)
          return response.data
})

export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: {
        fetchBookingsStatus: 'idle',
        bookings: {},
        calViewDate:  zonedTimeToUtc(new Date(), 'UTC').toISOString(),
        court: 1,
        bookingsByUser: []
    },
    reducers: {
      calViewDateUpdated(state, action) {
          state.calViewDate = action.payload
      },
      courtUpdated(state, action) {
        state.court = action.payload
      },
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
          [createBooking.pending]: (state, action) => {
            state.createBookingStatus = 'loading'
          },
          [createBooking.fulfilled]: (state, action) => {
            state.createBookingStatus = 'succeeded'
            state.bookings[action.payload.resources_id].push(action.payload)
          },
          [createBooking.rejected]: (state, action) => {
            state.createBookingStatus = 'failed'
          },
    }
})

export const { calViewDateUpdated, courtUpdated } = bookingsSlice.actions
export const selectBookings = state => state.bookings.bookings
export const selectFetchBookingsStatus = state => state.bookings.fetchBookingsStatus
export const selectCalViewDate = state => state.bookings.calViewDate
export const selectCourt = state => state.bookings.court

export default bookingsSlice.reducer