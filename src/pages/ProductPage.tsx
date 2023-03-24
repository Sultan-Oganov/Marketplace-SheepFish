import { useAppSelector, useAppDispatch } from '../modules/hooks/redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ProductItem } from '../components/ProductItem';
import { useGetProductByIdMutation } from '../modules/redux/api/productsAPI';
import { clearProduct } from '../modules/redux/slices/productsSlice';

export const ProductPage = () => {
  const { product } = useAppSelector((state) => state.products);
  const [getProductById] = useGetProductByIdMutation();
  const dispatch = useAppDispatch();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getProductById(id);
    }
    return () => {
      dispatch(clearProduct());
    };
  }, [id]);

  if (!product) {
    return <div className="text-2xl">Product not Found</div>;
  }

  return (
    <div className="flex">
      <ProductItem {...{ product }} />
    </div>
  );
};
