import { FC } from 'react';
import { IProduct } from '../../../modules/redux/types/products';

interface IInfo {
  product: IProduct;
}

export const Info: FC<IInfo> = ({ product }) => (
  <div>
    <h3>Title: {product.title}</h3>
    <h3>Price: {product.price}$</h3>
    <h3>Category: {product.category}</h3>
    <h3>Rating: {product.rating}</h3>
    <h3>Stock: {product.stock}</h3>
    <h3>Brand: {product.brand}</h3>
    <h3>Description: {product.description}</h3>
  </div>
);
