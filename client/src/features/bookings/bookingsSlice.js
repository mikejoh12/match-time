import { createSlice } from '@reduxjs/toolkit'
import { zonedTimeToUtc } from 'date-fns-tz'
import { roundToNearestMinutes } from 'date-fns'

const initialState = {
  calViewDate: zonedTimeToUtc(roundToNearestMinutes(new Date(), { nearestTo: 30 }), 'UTC').toISOString(),
  court: '',
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
})

export const { calViewDateUpdated, courtUpdated } = bookingsSlice.actions
export const selectCalViewDate = state => state.bookings.calViewDate
export const selectCourt = state => state.bookings.court

export default bookingsSlice.reducer