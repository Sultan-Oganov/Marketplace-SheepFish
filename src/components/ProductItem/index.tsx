import { FC, useEffect, useState } from 'react';
import { IProduct } from '../../modules/redux/types/products';
import { FormikValues } from 'formik';
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
} from '../../modules/redux/api/productsAPI';
import { useNavigate } from 'react-router-dom';
import { clearProduct } from '../../modules/redux/slices/productsSlice';
import { Info } from './Tabs/Info';
import { Edit } from './Tabs/Edit';
import { Delete } from './Tabs/Delete';

interface IProductItem {
  product: IProduct;
}

type Tab = 'info' | 'edit' | 'delete';

const renderTab = {
  info: Info,
  edit: Edit,
  delete: Delete,
};

export const ProductItem: FC<IProductItem> = ({ product }) => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('info');
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const { thumbnail } = product;

  const handleClick = (value: Tab) => {
    setTab(value);
  };

  const handleDelete = () => {
    deleteProduct(product);
    navigate(`/`);
  };

  const handleUpdate = (values: FormikValues) => {
    updateProduct({
      //@ts-ignore
      product: values,
      id: product.id,
    });
    navigate(`/`);
  };

  const Component = renderTab[tab];

  return (
    <div className="w-full p-5 bg-slate-300 rounded-lg flex flex-col">
      <div className="flex justify-center gap-10 font-medium font-3xl">
        <h2
          onClick={() => handleClick('info')}
          className={`${tab === 'info' && 'border-b-2 border-slate-900'} cursor-pointer`}>
          Info
        </h2>
        <h2
          onClick={() => handleClick('edit')}
          className={`${tab === 'edit' && 'border-b-2 border-slate-900'} cursor-pointer`}>
          Edit
        </h2>
        <h2
          onClick={() => handleClick('delete')}
          className={`${tab === 'delete' && 'border-b-2 border-slate-900'} cursor-pointer`}>
          Delete
        </h2>
      </div>
      <div className="w-72 h-44 mb-10">
        <img className="w-full h-full object-contain" src={thumbnail} alt="" />
      </div>

      <div className="flex items-center justify-between">
        <Component {...{ product, isLoading, handleUpdate, handleDelete }} />
      </div>
    </div>
  );
};
