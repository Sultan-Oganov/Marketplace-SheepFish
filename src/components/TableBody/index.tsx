import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { IProduct } from '../../modules/redux/types/products';
import { Columns } from '../Table';

interface ITableBody {
  columns: Columns;
  tableData: IProduct[];
}

export const TableBody: FC<ITableBody> = ({ columns, tableData }) => {
  const navigate = useNavigate();

  const handleClick = (id: number | string) => {
    navigate(`/product/${id}`);
  };

  return (
    <tbody>
      {tableData?.map((data) => {
        return (
          <tr key={data.id} className="border-b-2">
            {columns.map(({ accessor }) => {
              const tData = data[accessor] ? data[accessor] : '——';
              return accessor === 'thumbnail' ? (
                <td
                  key={accessor}
                  className="p-2 cursor-pointer"
                  onClick={() => handleClick(data.id)}>
                  {tData !== '——' ? (
                    <div className="h-14 w-20">
                      <img className="w-full h-full object-contain" src={tData as string} />
                    </div>
                  ) : (
                    tData
                  )}
                </td>
              ) : (
                <td
                  className="p-2 cursor-pointer"
                  key={accessor}
                  onClick={() => handleClick(data.id)}>
                  <div
                    title={tData.toString()}
                    className="w-36"
                    style={
                      accessor === 'description'
                        ? {
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }
                        : {}
                    }>
                    {tData}
                  </div>
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};
