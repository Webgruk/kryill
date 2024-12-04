import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../States/index'

export const store = configureStore({
  reducer: {
    auth: authReducer, // Add the auth slice to the store
  },
})
