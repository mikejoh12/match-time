import { configureStore } from '@reduxjs/toolkit'
import { api } from './services/api'
import currentFacilityReducer from './features/current-facility/currentFacilitySlice'
import authReducer from './features/auth/authSlice'

export default configureStore({
  reducer:  {
    currentFacility: currentFacilityReducer,
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (gDM) => gDM().concat(api.middleware),
})