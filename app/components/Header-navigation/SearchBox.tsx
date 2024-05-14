'use client'
import { Button } from '@radix-ui/themes'
import { useSearchParams } from 'next/navigation'
import { FaSearch } from 'react-icons/fa'
import All from './All'


const SearchBox = () => {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') || ''
  
  return (
    <form action="/search" method="GET">
      <div className="join">
        <All/>
        <input
          className="join-item input input-bordered w-[400px] "
          placeholder="Search"
          defaultValue={q}
          name="q"
        />
        <Button variant='classic' color='gray' size="4" className="join-item btn">
          <FaSearch/>
        </Button>
      </div>
    </form>
  )
}
export default SearchBox