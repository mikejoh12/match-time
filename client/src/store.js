import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { api } from './services/api'
import currentFacilityReducer from './features/current-facility/currentFacilitySlice'
import authUserReducer from './features/auth/authUserSlice'
// import authRefreshReducer from './features/auth/authRefreshSlice'
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
  storage: storageSession,
  blacklist: [api.reducerPath, 'authRefresh'],
}

const combinedReducer = combineReducers({
  currentFacility: currentFacilityReducer,
  authUser: authUserReducer,
   // authRefresh: authRefreshReducer, 
  ui: uiReducer,
  [api.reducerPath]: api.reducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'authUser/logout') {
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
