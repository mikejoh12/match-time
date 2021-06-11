import { configureStore } from '@reduxjs/toolkit'
import facilitiesReducer from './features/facilities/facilitiesSlice'
import bookingsReducer from './features/bookings/bookingsSlice'

export default configureStore({
  reducer:  {
    facilities: facilitiesReducer,
    bookings: bookingsReducer
  }
})