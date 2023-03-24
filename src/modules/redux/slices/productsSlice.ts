import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IntSortKeys, IProduct, TSortByInt } from '../types/products';
import { productsAPI } from '../api/productsAPI';

interface IState {
  products: IProduct[];
  product: IProduct | null;
}

const initialState: IState = {
  products: [],
  product: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    sort: (
      state,
      action: PayloadAction<{
        count: number;
        name: keyof IProduct;
      }>,
    ) => {
      const { count, name } = action.payload;

      if (
        name === IntSortKeys.id ||
        name === IntSortKeys.price ||
        name === IntSortKeys.rating ||
        name === IntSortKeys.stock
      ) {
        if (count === 1) {
          state.products.sort((a, b) => Number(a[name]) - Number(b[name]));
        } else {
          state.products.sort((a, b) => Number(b[name]) - Number(a[name]));
        }
      } else {
        if (count === 1) {
          state.products.sort((a, b) => (a[name] as string).localeCompare(b[name] as string));
        } else {
          state.products.sort((a, b) => (b[name] as string).localeCompare(a[name] as string));
        }
      }
    },
    clearProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(productsAPI.endpoints.getProducts.matchFulfilled, (state, { payload }) => {
      state.products = payload;
    });

    builder.addMatcher(
      productsAPI.endpoints.searchProducts.matchFulfilled,
      (state, { payload }) => {
        state.products = payload;
      },
    );

    builder.addMatcher(
      productsAPI.endpoints.getProductById.matchFulfilled,
      (state, { payload }) => {
        state.product = payload;
      },
    );
  },
});

export const { sort, clearProduct } = productsSlice.actions;
export default productsSlice.reducer;
