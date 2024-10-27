import { configureStore } from '@reduxjs/toolkit';
import userReducer from './FEATURES/USER/userSlice';
import cardReducer from './FEATURES/CARD/cardSlice';

const store = configureStore({
  reducer: { user: userReducer, card: cardReducer },
});
export default store;
