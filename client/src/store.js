import { configureStore } from '@reduxjs/toolkit'
import facilitiesReducer from './features/facilities/facilitiesSlice'

export default configureStore({
  reducer:  {
    facilities: facilitiesReducer
  }
})