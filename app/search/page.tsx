import ProductItem from '@/app/components/sections-home/Card'

import productServices from '@/lib/productService'
import { Button, Separator, Text } from '@radix-ui/themes'
import Link from 'next/link'

const sortOrders = ['newest', 'lowest', 'highest', 'rating']
const prices = [
  {
    name: '$1 to $50',
    value: '1-50',
  },
  {
    name: '$51 to $100',
    value: '51-100',
  },
  {
    name: '$101 to $500',
    value: '101-500',
  },
]

const ratings = [5, 4, 3, 2, 1]

export async function generateMetadata({
  searchParams: { q = 'all', category = 'all', price = 'all', rating = 'all', department = "all" },
}: {
  searchParams: {
    q: string
    category: string
    department: string
    price: string
    rating: string
    sort: string
    page: string
  }
}) {
  if (
    (q !== 'all' && q !== '') ||
    category !== 'all' ||
    department != " 'all" ||
    rating !== 'all' ||
    price !== 'all'
  ) {
    return {
      title: `Search ${q !== 'all' ? q : ''}
          ${category !== 'all' ? ` : Category ${category}` : ''}
          ${department !== 'all' ? ` : department ${department}` : ''}
          ${price !== 'all' ? ` : Price ${price}` : ''}
          ${rating !== 'all' ? ` : Rating ${rating}` : ''}`,
    }
  } else {
    return {
      title: 'Search Products',
    }
  }
}

export default async function SearchPage({
  searchParams: {
    q = 'all',
    category = 'all',
    department = 'all',
    price = 'all',
    rating = 'all',
    sort = 'newest',
    page = '1',
  },
}: {
  searchParams: {
    q: string
    category: string
    department: string
    price: string
    rating: string
    sort: string
    page: string
  }
}) {
  const getFilterUrl = ({
    c,
    sub,
    s,
    p,
    r,
    pg,
  }: {
    c?: any
    sub?: string
    s?: string
    p?: string
    r?: string
    pg?: string
  }) => {
    const params = { q, category, price, rating, sort, page, department }
    if (c) params.category = c
    if (sub) params.department = sub
    if (p) params.price = p
    if (r) params.rating = r
    if (pg) params.page = pg
    if (s) params.sort = s
    return `/search?${new URLSearchParams(params).toString()}`
  }
  const categories = await productServices.getCategories()

  const departments =await productServices.getdepartments()
  
  const { countProducts, products, pages } = await productServices.getByQuery({
    category,
    department,
    q,
    price,
    rating,
    page,
    sort,
  })
  return (
    <div className="max-w-screen-2xl mx-auto py-2 overflow-x-hidden min-h-[900px]">
    <div className="grid md:grid-cols-5 md:gap-5 mx-5 ">
      <div className='flex justify-center xl:block min-h-full'>
      <div className='block'>
        <Text size="5" >Categories</Text>
        <div >
          <ul>
            <li>
              <Link
                className={`link link-hover ${'all' === category && 'link-primary'
                  }`}
                href={getFilterUrl({ c: 'all' })}
              >
                Any
              </Link>
            </li>
            {categories.map((c: any) => (
              <li key={c}>
                <Link
                  className={`link link-hover ${c === category && 'link-primary'
                    }`}
                  href={getFilterUrl({ c })}
                >
                  {c}   
                </Link>
               
              </li>
            ))}
          </ul>
        </div>
        </div>
        <div>
          <Separator size="4"/>
          <div className='mt-0 mx-2 xl:mt-4 xl:mx-0'>
          <Text size="5">Price</Text>
        
          <ul>
            <li>
              <Link
                className={`link link-hover ${'all' === price && 'link-primary'
                  }`}
                href={getFilterUrl({ p: 'all' })}
              >
                Any
              </Link>
            </li>
            {prices.map((p) => (
              <li key={p.value}>
                <Link
                  href={getFilterUrl({ p: p.value })}
                  className={`link link-hover ${p.value === price && 'link-primary'
                    }`}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        </div>
             <div >
          <Separator size="4"/>
          <div className='mt-0 ml-2 xl:mt-4 xl:ml-0' >
          <Text size="5" >
              Departments
            </Text>
            <ul>
              <li>
                <Link
                  className={`link link-hover ${'all' === department && 'link-primary'
                   }`}
                  href={getFilterUrl({ sub: 'all' })}
                >
                  Any
                </Link>
              </li>
              {departments?.map((sub: string) => (
                <li key={sub}>
                  <Link
                    className={`link link-hover ${sub === department && 'link-primary'
                      }`}
                    href={getFilterUrl({ sub })}
                  >
                    {sub}
                  </Link>
                </li>
              )).slice(0,14)}
            </ul>
          </div>
        </div>
        
      </div>
      <div className="md:col-span-4">
        <div className="flex items-center justify-between  py-4">
          <div className="flex items-center">
            {products.length === 0 ? 'No' : countProducts} Results
            {q !== 'all' && q !== '' && ' : ' + q}
            {category !== 'all' && ' : ' + category}
            {department !== 'all' && ' : ' + department}
            {price !== 'all' && ' : Price ' + price}
            {rating !== 'all' && ' : Rating ' + rating + ' & up'}
            &nbsp;
            {(q !== 'all' && q !== '') ||
              category !== 'all' ||
              department !== 'all' ||
              rating !== 'all' ||
              price !== 'all' ? (
                <Button size="2" color='ruby' variant='surface' asChild>
                <Link href="/search">
                Clear
                </Link>
                </Button>
            ) : null}
          </div>
          <div>
            Sort by{' '}
            {sortOrders.map((s) => (
              <Link
                key={s}
                className={`mx-2 link link-hover ${sort == s ? 'link-primary' : ''
                  } `}
                href={getFilterUrl({ s })}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>

        <div >
          <div className="grid grid-cols-1 gap-4  xl:grid-cols-3 md:grid-cols-1">
            {products.map((product) => (
             
              <div key={product.slug} className='flex justify-center'>
              <ProductItem  product={product} />
              </div>
            
            ))}
          </div>
          <div className="xl:join md:max-w-[500px] my-10 flex justify-center mx-auto">
            {products.length > 0 &&
              Array.from(Array(pages).keys()).map((p) => (
                <Button variant="surface" size="3" key={p} mx="1" asChild>
                <Link
                className={`join-item btn ${Number(page) === p + 1 ? 'btn-active' : ''
                    } `}
                  href={getFilterUrl({ pg: `${p + 1}` })}
                >
                  {p + 1}
                </Link>
                </Button>
              ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
