import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  card: [],
};
const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addItem(state, action) {
      state.card.push(action.payload);
    },
    deleteItem(state, action) {
      state.card = state.card.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.card.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.card.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0) cardSlice.caseReducers.deleteItem(state, action);
    },
    clearCard(state) {
      state.card = [];
    },
  },
});
export default cardSlice.reducer;
export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCard,
} = cardSlice.actions;

export const getCard = (state) => state.card.card;
export const getTotalQuantity = (state) =>
  state.card.card.reduce((acc, item) => acc + item.quantity, 0);
export const getTotalPrice = (state) =>
  state.card.card.reduce((acc, item) => acc + item.totalPrice, 0);
export const getCurrentQuantity = (id) => (state) =>
  state.card.card.find((item) => item.pizzaId === id)?.quantity ?? 0;
