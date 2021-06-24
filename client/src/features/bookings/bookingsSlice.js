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

export const fetchBookingsByUser = createAsyncThunk('facilities/fetchBookingsByUser',
    async id => {
        const response = await apiAxios.get(`/bookings/by_user/${id}`)
        // Return an array of bookings for a user id
        return response.data
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
          return response.data
})

export const deleteBooking = createAsyncThunk('bookings/deleteBooking',
    async bookingId => {
        await apiAxios.delete(`/bookings/${bookingId}`)
        console.log('Id in thunk:', bookingId)
        return bookingId
})

export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: {
        fetchBookingsStatus: 'idle',
        fetchBookingsByUser: 'idle',
        deleteBookingStatus: 'idle',
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
          [deleteBooking.pending]: (state, action) => {
            state.deleteBookingStatus = 'loading'
          },
          [deleteBooking.fulfilled]: (state, action) => {
            state.deleteBookingStatus = 'succeeded'
            // Update user bookings after delete of booking from db
            console.log(typeof action.payload)
            state.bookingsByUser = state.bookingsByUser.filter(booking => booking.bookings_id !== parseInt(action.payload, 10))
          },
          [deleteBooking.rejected]: (state, action) => {
            state.deleteBookingStatus = 'failed'
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