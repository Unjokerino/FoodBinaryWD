import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface CartState {
  cart: { [key: string]: number | number };
}

// Define the initial state using that type
const initialState: CartState = {
  cart: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string | number>) => {
      state.cart[action.payload] = state.cart[action.payload] + 1 || 1;
    },
    removeFromCart: (state, action: PayloadAction<string | number>) => {
      state.cart[action.payload] = state.cart[action.payload] - 1;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
