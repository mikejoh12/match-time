import { configureStore } from '@reduxjs/toolkit'
import { api } from './services/api'
import facilitiesReducer from './features/facilities/facilitiesSlice'
import bookingsReducer from './features/bookings/bookingsSlice'

export default configureStore({
  reducer:  {
    facilities: facilitiesReducer,
    bookings: bookingsReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (gDM) => gDM().concat(api.middleware),
})