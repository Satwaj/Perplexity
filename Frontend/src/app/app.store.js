import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/auth.slice';
import chatReducer from './features/chat/chat.slice';
import battleReducer from './features/battle/battle.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    battle: battleReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setError'],
        ignoredPaths: ['auth.error']
      }
    })
})


