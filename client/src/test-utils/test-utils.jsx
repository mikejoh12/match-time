import React, { BrowserRouter} from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

// Import reducers and api from RTK Query
import { api } from '../services/api'
import authReducer from '../features/auth/authSlice'
import currentFacilityReducer from '../features/current-facility/currentFacilitySlice'
import uiReducer from '../features/ui/uiSlice'

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

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: (gDM) => gDM().concat(api.middleware),
      }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }