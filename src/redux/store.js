import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import phonebookReducer from './phonebook/phonebook-reducer';

import { authReducers } from './authorization';

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  logger,
];

const authPersistConfig = {
  key: 'authorization',

  storage,

  whitelist: ['token'],
};

const store = configureStore({
  reducer: {
    contacts: phonebookReducer,
    auth: persistReducer(authPersistConfig, authReducers),
  },
  middleware,

  devTools: process.env.NODE_ENV === 'development',
});

const persistor = persistStore(store);

export default { persistor, store };