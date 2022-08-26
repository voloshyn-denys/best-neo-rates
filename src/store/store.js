import { configureStore } from '@reduxjs/toolkit'
import ratesReducer from './rates/ratesSlice';

const store = configureStore({
  reducer: {
    rates: ratesReducer,
  }
})

export default store;