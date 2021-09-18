import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { api } from '../services/api'
import authReducer from '../features/auth/authUserSlice'
import persistedAuthReducer from '../features/auth/authTokenSlice'
import currentFacilityReducer from '../features/current-facility/currentFacilitySlice'
import uiReducer from '../features/ui/uiSlice'
import { fireEvent, screen } from '../test-utils/test-utils'
import userEvent from '@testing-library/user-event'

const combinedReducer = combineReducers({
    currentFacility: currentFacilityReducer,
    auth: authReducer,
    persistedAuth: persistedAuthReducer,
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

// wrap RTL render with custom render
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

export const loginUser = async (email, password) => {
  fireEvent.click(screen.getByTestId('login'))
  expect(screen.getByText('Email')).toBeInTheDocument()
  expect(screen.getByText('Password')).toBeInTheDocument()

  userEvent.type(screen.getByTestId('login-email'), email)
  userEvent.type(screen.getByTestId('login-password'), password)
  expect(screen.getByTestId('login-email')).toHaveValue(email)
  expect(screen.getByTestId('login-password')).toHaveValue(password)

  fireEvent.click(screen.getByTestId('login-user-submit'))
  expect(await screen.findByText(`${email} - No facility selected`)).toBeInTheDocument()
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }