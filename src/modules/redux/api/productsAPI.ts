import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct } from '../types/products';

export const productsAPI = createApi({
  reducerPath: 'productsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/',
  }),
  tagTypes: ['Product'],
  endpoints: (build) => ({
    getProducts: build.query<IProduct[], null>({
      query: () => ({
        url: '/products',
      }),
      transformResponse: (response: any) => response.products,
      providesTags: () => ['Product'],
    }),
    getProductById: build.mutation<IProduct, string | number>({
      query: (id: string | number) => ({
        url: `/products/${id}`,
      }),
      invalidatesTags: ['Product'],
    }),
    searchProducts: build.mutation<IProduct[], string>({
      query: (name: string) => ({
        url: `/products/search?q=${name}`,
      }),
      transformResponse: (response: any) => response.products,
    }),
    createProduct: build.mutation<IProduct, IProduct>({
      query: (product) => ({
        url: '/products/add',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: build.mutation<IProduct, { product: IProduct; id: number }>({
      query: ({ product, id }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: build.mutation<IProduct, IProduct>({
      query: (product) => ({
        url: `/products/${product.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdMutation,
  useSearchProductsMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsAPI;
