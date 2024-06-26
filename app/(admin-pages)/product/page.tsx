import Image from 'next/image'
import { Toaster } from 'react-hot-toast'
import dbConnect from '@/lib/db-connect'
import ProductModel, { Product } from '@/lib/product-model'
import DeleteForm from '../../components/Admin-navigation/delete-product'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Sidebar from '@/app/components/Admin-navigation/sidebar'
import { Button, Text } from '@radix-ui/themes'
import { FaArrowLeft, FaArrowRight, FaChevronLeft, FaChevronRight, FaPencilAlt } from 'react-icons/fa'
import SearchBox from '@/app/components/Admin-navigation/search'


export default async function ProductDashboard({ searchParams }:
  { searchParams: { [key: string]: string | string } }) {

  const session = await getServerSession();

  if (session?.user?.email !== "admin@example.com") {
    redirect("/")
  }

  const query = searchParams.query || '';
  await dbConnect()

  let page = parseInt(searchParams.page, 10);
  page = !page || page < 1 ? 1 : page;
  const perPage = 8;
  const products = (await ProductModel.find({
    name: { $regex: new RegExp(query, 'i') }, 
  })
    .skip(perPage * (page - 1))
    .limit(perPage)
    .sort({
      _id: 1,
    })) as Product[];

  const totalProducts = (await ProductModel.countDocuments({}))

  const totalPages = Math.ceil(totalProducts / perPage);

  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const nextPage = page + 1;

  const pageNumbers = [];
  const offsetNumber = 3;
  for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
    if (i >= 1 && i <= totalPages) {
      pageNumbers.push(i);
    }
  }
  
  return (
    <div className="max-w-screen-2xl mx-auto my-10">
      <div className="grid md:grid-cols-5 md:gap-5">
        <Sidebar />
        <div className="md:col-span-3">
          <div className="mx-auto max-w-2xl lg:max-w-7xl" >
            <div className="block xl:flex justify-between items-center">
              <h1 className="font-bold py-10 text-2xl ">Admin Products</h1>
              <Toaster />
              <Button size="3">
                <Link href="/product/new">
                Create New Product
                </Link>
              </Button>
             <SearchBox query={query}/>
            </div>
           Total products :  {totalProducts}
            <div className="overflow-x-auto">
              <div className='block md:hidden xl:hidden'>
              <Button variant="ghost" size="3"><FaArrowLeft/> Scroll <FaArrowRight/></Button>                
              </div> 
            <table className="table text-center">
              <thead>
                <tr className='bg-[#141726]'>
                  <th><Text size="2" color='gray'  >Image</Text></th>
                  <th><Text size="2" color='gray'  >Name</Text></th>
                  <th><Text size="2" color='gray'  >Price</Text></th>
                  <th><Text size="2" color='gray'  >Edit</Text></th>
                  <th><Text size="2" color='gray'  >Delete</Text></th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5}>No product found</td>
                  </tr>
                ) : (
                  products.map((product: Product) => (
                    <tr key={product._id}>
                      <td>
                        <Link href={`/products/${product.slug}`}>
                          <Image
                            src={product.image[0]}
                            alt={product.name}
                            width={100}
                            height={100}
                            className="rounded-lg max-w-[100px] max-h-[100px] min-h-[100px]"
                          />
                        </Link>
                      </td>
                      <td ><Text size="2" color='gray'>{product.name}</Text></td>
                      <td className='text-bold'>${product.price}</td>
                      <td>
                        <Button size="2" variant='surface' asChild>
                          <Link href={`/product/${product._id}`} >
                            Edit
                            <FaPencilAlt />
                          </Link>
                        </Button>
                      </td>
                      <td>

                        <DeleteForm
                          _id={product._id.toString()}
                          name={product.name}
                        />
                      </td>
                    </tr>
                  ))
                )
                }
              </tbody>
            </table>
            </div>
            <div className="flex justify-center items-center my-16">
              <div className="flex border-[1px] gap-4 rounded-[10px] border-light-green p-4">
                {page === 1 ? (
                  <Button size="2" variant='surface' color='gray' aria-disabled="true">
                    Previous
                  </Button>
                ) : (
                  <Link href={`?page=${prevPage}`} aria-label="Previous Page">
                    <Button size="2" variant='surface' >
                      <FaChevronLeft />
                      Previous
                    </Button>
                  </Link>
                )}
                {pageNumbers.map((pageNumber, index) => (
                  <Link
                    key={index}
                    className={
                      page === pageNumber
                        ? "join-item btn btn-square btn-sm "
                        : "hover:join-item btn btn-square btn-neutral btn-sm "
                    }
                    href={`?page=${pageNumber}`}
                  >
                    {pageNumber}
                  </Link>
                ))}
                {page === totalPages ? (
                  <Button size="2" variant='surface' color='gray' aria-disabled="true">
                    Next
                  </Button>
                ) : (
                  <Link href={`?page=${nextPage}`} aria-label="Next Page">
                    <Button size="2" variant='surface'>
                      Next
                      <FaChevronRight />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}