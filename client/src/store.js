import { configureStore } from '@reduxjs/toolkit'
import facilitiesReducer from './features/facilities/facilitiesSlice'
import bookingsReducer from './features/bookings/bookingsSlice'
import resourcesReducer from './features/resources/resourcesSlice'

export default configureStore({
  reducer:  {
    facilities: facilitiesReducer,
    bookings: bookingsReducer,
    resources: resourcesReducer
  }
})