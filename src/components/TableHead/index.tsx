import { FC, useState, useMemo } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { useAppDispatch } from '../../modules/hooks/redux';
import { sort } from '../../modules/redux/slices/productsSlice';
import { IProduct } from '../../modules/redux/types/products';
import { Columns } from '../Table';

interface ITableHead {
  columns: Columns;
}

export const TableHead: FC<ITableHead> = ({ columns }) => {
  const [sortProperty, setSortProperty] = useState({ name: '', count: 0 });
  const dispatch = useAppDispatch();

  const handleClick = (accessor: keyof IProduct) => {
    setSortProperty((prev) => {
      const data = {
        name: accessor,
        count: prev.name !== accessor ? 1 : prev.count > 1 ? 0 : (prev.count += 1),
      };
      dispatch(sort({ name: data.name, count: data.count }));
      return data;
    });
  };

  return (
    <thead className="text-left bg-gray-200">
      <tr>
        {columns.map(({ label, accessor }) => {
          const isNotImage = accessor !== 'thumbnail';
          return (
            <th className="p-2" onClick={() => isNotImage && handleClick(accessor)} key={accessor}>
              <div className={`flex items-center gap-2 ${isNotImage && 'cursor-pointer'} relative`}>
                {label}
                {sortProperty.count > 0 && (
                  <div className="absolute right-0">
                    {sortProperty.name === accessor && sortProperty.count === 1 && <FaAngleUp />}
                    {sortProperty.name === accessor && sortProperty.count === 2 && <FaAngleDown />}
                  </div>
                )}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
