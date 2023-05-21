import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../utils/types";
import { RootState } from "./store";

interface BasketState {
  items: Item[];
}

const initialState: BasketState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<Item>) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action: PayloadAction<Item>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.payload.id}) as it is not in the basket!`
        );
      }

      state.items = newBasket;
    },
    clearBasket: (state) => {
      state.items = [];
    },
  },
});

export const { addToBasket, removeFromBasket, clearBasket } =
  basketSlice.actions;

export const selectBasketItems = (state: RootState) =>
  state.basketReducer.items;

export const selectBasketItemsWithId = (state: RootState, id: number) =>
  state.basketReducer.items.filter((item) => item.id === id);

export const selectBasketTotal = (state: RootState) =>
  state.basketReducer.items.reduce((total, item) => (total += item.price), 0);

export default basketSlice.reducer;
