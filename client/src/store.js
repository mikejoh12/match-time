import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { api } from './services/api'
import currentFacilityReducer from './features/current-facility/currentFacilitySlice'
import authUserReducer from './features/auth/authUserSlice'
import authTokenReducer from './features/auth/authTokenSlice'
import uiReducer from './features/ui/uiSlice'
import storageSession from 'redux-persist/lib/storage/session'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage: storageSession
}

const combinedReducer = combineReducers({
  currentFacility: currentFacilityReducer,
  authUser: authUserReducer,
  authToken: authTokenReducer,
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

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (gDM) => gDM({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
})

export let persistor = persistStore(store)
