import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productsAPI } from '../api/productsAPI';

interface IState {
  isOpen: boolean;
  type: 'success' | 'error';
  message: string | null;
}

const initialState: IState = {
  isOpen: false,
  type: 'success',
  message: null,
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    toggleSnackbarOpen: (
      state,
      action: PayloadAction<{ message: string; type: 'success' | 'error' }>,
    ) => {
      state.isOpen = true;
      state.type = action.payload.type || 'success';
      state.message = action.payload.message;
    },
    toggleSnackbarClose: (state) => {
      state.isOpen = false;
      state.type = 'success';
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(productsAPI.endpoints.createProduct.matchFulfilled, (state, { meta }) => {
      //@ts-ignore
      const status = meta.baseQueryMeta.response.status;
      if (status === 200) {
        state.isOpen = true;
        state.type = 'success';
        state.message = 'Product created successfully!';
      }
    });

    builder.addMatcher(productsAPI.endpoints.updateProduct.matchFulfilled, (state, { meta }) => {
      //@ts-ignore
      const status = meta.baseQueryMeta.response.status;
      if (status === 200) {
        state.isOpen = true;
        state.type = 'success';
        state.message = 'Product updated successfully!';
      }
    });

    builder.addMatcher(productsAPI.endpoints.deleteProduct.matchFulfilled, (state, { meta }) => {
      //@ts-ignore
      const status = meta.baseQueryMeta.response.status;
      if (status === 200) {
        state.isOpen = true;
        state.type = 'success';
        state.message = 'Product deleted successfully!';
      }
    });
  },
});

export const { toggleSnackbarOpen, toggleSnackbarClose } = snackbarSlice.actions;
export default snackbarSlice.reducer;
