import { configureStore } from '@reduxjs/toolkit'
import { api } from './services/api'
import currentFacilityReducer from './features/current-facility/currentFacilitySlice'

export default configureStore({
  reducer:  {
    currentFacility: currentFacilityReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (gDM) => gDM().concat(api.middleware),
})