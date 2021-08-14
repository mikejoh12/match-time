import { createSlice } from '@reduxjs/toolkit'
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz'
import { roundToNearestMinutes } from 'date-fns'

const initialState = {
  calViewDate: zonedTimeToUtc(roundToNearestMinutes(new Date(), { nearestTo: 30 }), 'UTC').toISOString(),
  currentResource: '',
  facility: {},
  bookingDate: utcToZonedTime(roundToNearestMinutes(new Date(), { nearestTo: 30 }), 'UTC').toISOString(),
  bookingSelectedResource: '',
  bookingDuration: 60
}

export const currentFacilitySlice = createSlice({
    name: 'currentFacility',
    initialState,
    reducers: {
      calViewDateUpdated(state, action) {
          state.calViewDate = action.payload
      },
      currentResourceUpdated(state, action) {
        state.currentResource = action.payload
      },
      facilityUpdated(state, action) {
        state.facility = action.payload
      },
      bookingDateUpdated(state, action) {
        state.bookingDate = action.payload
      },
      bookingSelectedResourceUpdated(state, action) {
        state.bookingSelectedResource = action.payload
      },
      bookingDurationUpdated(state, action) {
        state.bookingDuration = action.payload
      },
      logout:  (state) => {}
    },       
})

export const {  calViewDateUpdated,
                currentResourceUpdated,
                facilityUpdated,
                bookingDateUpdated,
                bookingSelectedResourceUpdated,
                bookingDurationUpdated,
                logout } = currentFacilitySlice.actions
export const selectCalViewDate = state => state.currentFacility.calViewDate
export const selectCurrentResource = state => state.currentFacility.currentResource
export const selectFacility = state => state.currentFacility.facility
export const selectFacilityIsLoaded = state => {
  const obj = state.currentFacility.facility
  return !(obj && Object.keys(obj).length === 0 && obj.constructor === Object) // Return true when facility is loaded (for calendar) 
}
export const selectBookingDate = state => state.currentFacility.bookingDate
export const selectBookingSelectedResource = state => state.currentFacility.bookingSelectedResource
export const selectBookingDuration = state => state.currentFacility.bookingDuration

export default currentFacilitySlice.reducer