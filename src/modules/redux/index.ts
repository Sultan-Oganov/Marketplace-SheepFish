import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productsAPI } from './api/productsAPI';
import productsSlice from './slices/productsSlice';
import snackbarSlice from './slices/snackbarSlice';

const rootReducer = combineReducers({
  products: productsSlice,
  snackbar: snackbarSlice,
  [productsAPI.reducerPath]: productsAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsAPI.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
