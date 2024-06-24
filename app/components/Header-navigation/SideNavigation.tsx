"use client"
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaTimes, FaUserCircle } from 'react-icons/fa';
import { LuMenu } from 'react-icons/lu';
import useSWR from 'swr'
import { removeUser } from "@/store/nextSlice"
import { Button, Separator, Text, TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useSearchParams } from 'next/navigation';
import CartTool from './CartTool';
import FavoriteList from './FavoriteList';

const fetcher = (url: any) => fetch(url).then((res) => res.json());
const SideBar = () => {
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const { data, error } = useSWR('/api/products/categories', fetcher)
    const { data: session } = useSession();
 
    const searchParams = useSearchParams()
    const q = searchParams.get('q') || ''

    const handleSignOutClick: React.MouseEventHandler<HTMLParagraphElement> = (event) => {

        removeUser()
        signOut({ redirect: false })
    };
    return (
        <div className='inline-flex md:hidden my-auto'>
            <Button onClick={() => setOpen(true)}>
                <p className="flex items-center gap-1 h-8 px-2 border border-transparent
                  cursor-pointer duration-300" >
                    <LuMenu className="text-xl  font-extrabold" />
                </p>
            </Button>
            <div className='py-3 top-0 left-0 right-0 shadow-md z-30 '>
                <div className={`${!open && "hidden"} bg-gray-600/50 min-h-screen w-full 
              fixed top-0 left-0 right-0 `} onClick={() => setOpen(false)}></div>
                <div className={`${open ? "w-80" : "w-0"}  bg-gray-800 min-h-screen fixed
                 overflow-y-scroll
                top-0 left-0 transition-all duration-300 `}>
                    <div className={`${!open && "hidden"} pt-3 mt-[80px]`}>
                        {session?.user ? (
                            <>
                                <div className='flex mx-5'>
                                    {session.user.image ? ( // Add a check for null or undefined
                                        <Image
                                            src={session.user.image} // This assumes session.user.image is a string
                                            alt=""
                                            width={100}
                                            height={100}
                                            className="w-11 h-11 rounded-full object-cover"
                                        />
                                    ) : (
                                        // Handle the case where session.user.image is null or undefined
                                        <div>Image not available</div>
                                    )}
                                    <div className="text-xs  flex flex-col pl-5 ">
                                        <p className="text-base font-bold text-[18px]">{session.user.name}</p>
                                        <p>{session.user.email}</p>
                                    </div>
                                    <Button className='ml-auto '
                                        aria-label="close" onClick={() => setOpen(false)}>
                                        <FaTimes />
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className="flex text-[22px] justify-between p-5">
                                <i> <FaUserCircle /></i>
                                <Link href='/signin'>
                                    <h2>Hello, <span>Signin</span></h2>
                                </Link>
                                <Button aria-label="close" onClick={() => setOpen(false)}>
                                    <FaTimes />
                                </Button>
                            </div>)}
                            <Separator size="4" />
                        <div className="p-5 ">
                         <div className='flex justify-between m-5'>
                            <CartTool/>
                            <FavoriteList/>
                            </div>
        
        <form action="/search" method="GET">
      <div className="join flex justify-center">
        
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
                            <ul>
                                <li className='py-2  hover:bg-[#babebe]  
                                        hover:text-black cursor-pointer'>  <Link href="#home" >
                                    Home
                                </Link></li>
                                <li className='py-2  hover:bg-[#babebe]  
                                        hover:text-black cursor-pointer'><Link href="#collection" >
                                    Collections
                                </Link>
                                </li>
                                <li className='py-2  hover:bg-[#babebe]  
                                        hover:text-black cursor-pointer'><Link href={`/search?discount>`} >
                                    Today&apos;s Deals
                                </Link>
                                </li>
                                <li className='py-2  hover:bg-[#babebe]  
                                        hover:text-black cursor-pointer'><Link href={`/products/557`} >
                                    Gift
                                </Link></li>

                            </ul>
                            <Separator size="4" />
                            <h2 className='text-[18px] font-semibold my-2 '>
                                Shop by Categories
                            </h2>
                            <ul>
                                {data?.categories.map((category: string) => (
                                    <Link key={category} href={`/search?category=${category}`}>
                                        <li className='py-2  hover:bg-[#babebe]  
                                        hover:text-black cursor-pointer'
                                            key={category} value={category} onClick={() => setOpen(false)}>
                                            <Text size="2">{category}</Text>
                                        </li>
                                    </Link>
                                )).slice(0, 3)}
                                {!show &&
                                    <div className="flex py-2 leading-3 text-primary
                                    hover:text-orange-400 cursor-pointer">
                                        <li onClick={() => setShow(true)}>See more</li>
                                        <FaChevronDown />
                                    </div>
                                }
                            </ul>
                            {show &&
                                <ul >
                                    {data?.categories.map((category: string) => (
                                        <Link key={category} href={`/search?category=${category}`}>
                                            <li className='py-2 hover:bg-[#babebe] 
                                              hover:text-black cursor-pointer'
                                                key={category} value={category}
                                                onClick={() => setOpen(false)}>
                                                <Text size="2" >{category}</Text>
                                            </li>
                                        </Link>
                                    )).slice(3, 10)}
                                    <div className='flex py-2 leading-3 
                                     hover:text-orange-400 cursor-pointer'>
                                        <li onClick={() => setShow(false)} >See less</li>
                                        <FaChevronUp />
                                    </div>
                                </ul>
                            }
                        </div>
                        <Separator size="4" />
                        <div className="p-5 ">
                            <h2 className='text-[18px] font-semibold mb-2 '>
                                Your account
                            </h2>
                            <p className='py-2 hover:bg-[#babebe]  hover:text-black cursor-pointer'>
                                Account
                            </p>
                            <p className='py-2 hover:bg-[#babebe]  hover:text-black cursor-pointer'>
                                <Link href="/customer">
                                    Customer Services
                                </Link></p>
                            {session?.user ? (
                                <p className='py-2 hover:bg-[#babebe]  hover:text-black cursor-pointer'
                                    onClick={handleSignOutClick}>
                                    Signout
                                </p>
                            ) : (
                                <>
                                    <p className='py-2 hover:bg-[#babebe]   hover:text-black cursor-pointer'>
                                        <Link href="/signin">Signin </Link>
                                    </p>

                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar