"use client"
import { TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

const SearchInput = ({query}:any) => {
  
         
  return (
    <form action="" method="GET" >
                <TextField.Root   name="query"
                    placeholder="Search products…"
                    defaultValue={query}
                    autoComplete='off'
                 >
                  <TextField.Slot>
                    <MagnifyingGlassIcon height="16" width="16" />
                  </TextField.Slot>
                </TextField.Root>
              </form>
  );
};

export default SearchInput;
