"use client"
import { useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { Button } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SearchProducts from './SearchProducts';

const CombinedSearchBox = ({ product }:any) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event:any) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();
    router.push(`/search?query=${searchQuery}`);
    setSearchQuery('');
  };

  const filtered = product.filter((item:any) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='border-2 rounded-lg border-[#3c52a2]'>
      <form onSubmit={handleSubmit} className='hidden xl:flex'>
        <div className='flex items-center'>
          <input
            onChange={handleSearch}
            value={searchQuery}
            className='w-[600px] h-full px-2 placeholder:text-sm text-base border-0 outline-none'
            type='text'
            name='search'
            placeholder='Buscar productos'
          />
          <Button variant='classic' size="4" color='gray'>
            <HiOutlineSearch className='text-white font-bold' />
          </Button>
        </div>
      </form>

      {searchQuery && (
        <div className='absolute left-0 top-12 w-full mx-auto max-h-96 z-30 bg-gray-200 rounded-lg overflow-y-scroll cursor-pointer text-black'>
          {filtered.length > 0 ? (
            <>
              {filtered.map((item:any) => (
                <Link
                  key={item._id}
                  className='w-full border-b-[1px] border-white flex items-center gap-4'
                  href={`/products/${item.slug}`}
                  onClick={() => setSearchQuery('')}
                >
                  {/* Assuming SearchProducts component renders the search results */}
                  <SearchProducts item={item} />
                </Link>
              ))}
            </>
          ) : (
            <div className='bg-gray-50 flex items-center justify-center py-10 rounded-lg shadow-lg'>
              <p className='text-xl font-semibold animate-bounce'>
                No items found!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CombinedSearchBox;
