import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { api } from './services/api'
import currentFacilityReducer from './features/current-facility/currentFacilitySlice'
import authReducer from './features/auth/authSlice'
import uiReducer from './features/ui/uiSlice'

const combinedReducer = combineReducers({
  currentFacility: currentFacilityReducer,
  auth: authReducer,
  ui: uiReducer,
  [api.reducerPath]: api.reducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logout') {
    state = undefined;
  }
  if (action.type === 'currentFacility/logout') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default configureStore({
  reducer: rootReducer,
  middleware: (gDM) => gDM().concat(api.middleware),
})