import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/auth.slice';
import chatReducer from './features/chat/chat.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setError'],
        ignoredPaths: ['auth.error']
      }
    })
})


