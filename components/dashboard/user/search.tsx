'use client';

import { TextField } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { useState, ChangeEvent, FormEvent } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaClosedCaptioning, FaX } from 'react-icons/fa6';

interface SearchBoxProps {
  defaultQuery: string; // Add this prop to initialize the query from server
}

const SearchBox: React.FC<SearchBoxProps> = ({ defaultQuery }) => {
  const router = useRouter();
  const [query, setQuery] = useState<string>(defaultQuery || ''); // Initialize with the default query

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
  };

  const clearQuery = () => {
    setQuery('');
    router.push('/admin/users'); // Clear the search query in the URL
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Update the URL with the new query param
    if (query) {
      router.push(`/admin/users?query=${query}`);
    } else {
      router.push('/admin/users');
    }
  };

  return (
    <div className="md:inline-flex h-[48px] w-full mb-[8px]">
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="join flex w-full bg-[#edecf2]">
          <TextField.Root
            size="3"
            value={query}
            onChange={handleChange}
            name="q"
            placeholder="Search Users"
            className="w-full"
          >
            <TextField.Slot>
              <FaSearch height="16" width="16" />
            </TextField.Slot>
            {query && (
              <TextField.Slot onClick={clearQuery} style={{ cursor: 'pointer' }}>
                <FaX height="16" width="16" />
              </TextField.Slot>
            )}
          </TextField.Root>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
