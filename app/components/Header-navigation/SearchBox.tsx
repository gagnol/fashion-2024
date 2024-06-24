'use client'
import { Button, TextField } from '@radix-ui/themes'
import { useSearchParams } from 'next/navigation'
import { FaSearch } from 'react-icons/fa'
import All from './All'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'


const SearchBox = () => {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') || ''

  return (
    <div className="hidden md:inline-flex">
    <form action="/search" method="GET">
      <div className="join flex">
        <All />

        <TextField.Root 
        size="3"
        defaultValue={q}
          name="q"
          placeholder="Search products…">
          <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

      </div>
    </form>
    </div>
  )
}
export default SearchBox