import { createSlice } from '@reduxjs/toolkit'
import { zonedTimeToUtc } from 'date-fns-tz'
import { roundToNearestMinutes } from 'date-fns'

const initialState = {
  calViewDate: zonedTimeToUtc(roundToNearestMinutes(new Date(), { nearestTo: 30 }), 'UTC').toISOString(),
  court: '',
  facility: {}
}

export const currentFacilitySlice = createSlice({
    name: 'currentFacility',
    initialState,
    reducers: {
      calViewDateUpdated(state, action) {
          state.calViewDate = action.payload
      },
      courtUpdated(state, action) {
        state.court = action.payload
      },
      facilityUpdated(state, action) {
        state.facility = action.payload
      },
      logout:  (state) => {}
    },       
})

export const { calViewDateUpdated, courtUpdated, facilityUpdated, logout } = currentFacilitySlice.actions
export const selectCalViewDate = state => state.currentFacility.calViewDate
export const selectCourt = state => state.currentFacility.court
export const selectFacility = state => state.currentFacility.facility

export default currentFacilitySlice.reducer