import { ChangeEvent } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSearchProductsMutation } from '../../modules/redux/api/productsAPI';

export const Search = () => {
  const [search] = useSearchProductsMutation();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    search(event.target.value);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        onChange={handleChange}
        placeholder="Search"
        className="text-black p-1 rounded-lg outline-none"
      />
      <FaSearch />
    </div>
  );
};
