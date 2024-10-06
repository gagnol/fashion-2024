"use client"
import { TextField } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { useState, ChangeEvent, FormEvent } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import { Dispatch, SetStateAction } from 'react';

interface SearchBoxProps {
  defaultQuery: string;
  onSearch: Dispatch<SetStateAction<string>>; // Add the onSearch prop here
}

const SearchBox: React.FC<SearchBoxProps> = ({ defaultQuery, onSearch }) => {
  const router = useRouter();
  const [query, setQuery] = useState<string>(defaultQuery || '');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value); // Call the onSearch prop when the value changes
  };

  const clearQuery = () => {
    setQuery('');
    onSearch(''); // Clear the query in the parent as well
    router.push('/admin/product');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/admin/product?query=${query}`);
  };

  return (
    <div className="md:inline-flex h-[48px] w-full mb-[8px]">
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="relative flex items-center w-full
         bg-[#edecf2] rounded-r-md">
          <FaSearch className="absolute left-3 text-gray-500" />
          <input
            type="text"
            value={query}
            onChange={handleChange}
            name="q"
            placeholder="Search Products"
            className="pl-10 pr-10 py-2 w-full bg-transparent rounded-md focus:outline-none"
          />

          {query && (
            <FaX
              className="absolute right-3 text-gray-500 cursor-pointer"
              onClick={clearQuery}
            />
          )}
        </div>
      </form>
    </div>
  );
};
export default SearchBox;
