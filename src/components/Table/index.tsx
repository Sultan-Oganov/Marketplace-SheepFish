import { TableHead } from '../TableHead/index';
import { TableBody } from '../TableBody/index';
import { useAppSelector } from '../../modules/hooks/redux';
import { useGetProductsQuery } from '../../modules/redux/api/productsAPI';
import { Loader } from '../Loader';
import { IProduct } from '../../modules/redux/types/products';
import { useMemo } from 'react';

export type Columns = { label: string; accessor: keyof IProduct }[];

export const Table = () => {
  const { isLoading } = useGetProductsQuery(null);
  const { products: tableData } = useAppSelector((state) => state.products);
  // ID, назва, опис, ціна, фото, рейтинг, сток, категорія.
  const columns: Columns = useMemo(
    () => [
      { label: 'ID', accessor: 'id' },
      { label: 'Title', accessor: 'title' },
      { label: 'Description', accessor: 'description' },
      { label: 'Price', accessor: 'price' },
      { label: 'Image', accessor: 'thumbnail' },
      { label: 'Rating', accessor: 'rating' },
      { label: 'Stock', accessor: 'stock' },
      { label: 'Category', accessor: 'category' },
    ],
    [],
  );

  if (isLoading) {
    return (
      <div className="w-full grid place-items-center">
        <Loader />
      </div>
    );
  }

  return (
    <table className="table w-full overflow-auto">
      <TableHead columns={columns} />
      <TableBody columns={columns} tableData={tableData} />
    </table>
  );
};
