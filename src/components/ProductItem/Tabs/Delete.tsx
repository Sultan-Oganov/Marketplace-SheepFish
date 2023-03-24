import { FC } from 'react';

interface IDelete {
  handleDelete: () => void;
}

export const Delete: FC<IDelete> = ({ handleDelete }) => (
  <div className="flex flex-col">
    <h3 className="text-xl font-bold mb-10">Are you sure want to delete?</h3>
    <button
      className="bg-red-600 text-white rounded p-2 font-medium text-xl"
      onClick={handleDelete}>
      Delete product
    </button>
  </div>
);
