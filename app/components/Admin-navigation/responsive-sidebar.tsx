"use client"
import { Button } from '@radix-ui/themes';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaArrowRight, FaChevronDown, FaChevronUp, FaTimes, FaUserCircle } from 'react-icons/fa';
import { LuMenu } from 'react-icons/lu';



const ResponsiveSideBar = () => {
    const [open, setOpen] = useState(false);
   
    
    return (
        <div className='inline-flex md:hidden my-auto'>
            <Button variant='surface' onClick={() => setOpen(true)}>
                <p className="flex items-center gap-1 h-8 px-2 border border-transparent
                  cursor-pointer duration-300" >
                    Navigation
                    <FaArrowRight className="text-xl font-extrabold" />
                </p>
            </Button>
            <div className='py-3 top-0 left-0 right-0 shadow-md z-30 '>
                <div className={`${!open && "hidden"} bg-gray-600/50 min-h-screen w-full 
              fixed top-0 left-0 right-0 `} onClick={() => setOpen(false)}></div>
                <div className={`${open ? "w-80" : "w-0"}  bg-base-300 min-h-screen fixed overflow-y-scroll
                top-0 left-0 transition-all duration-300 `}>
                    <div className={`${!open && "hidden"} pt-3 mt-[80px]`}>
                         <div className="p-5 text-neutral-content border-t-2 border-gray-400">
                            <h2 className='text-[18px] font-semibold mb-2 text-white'>Programs & Features</h2>
                            <p className='py-2 hover:bg-[#babebe]  hover:text-black cursor-pointer'>Gift Cards & Mobile Recharges</p>
                            <p className='py-2 hover:bg-[#babebe]  hover:text-black cursor-pointer'>Flight Tickets</p>
                            <p className='py-2 hover:bg-[#babebe]  hover:text-black cursor-pointer'>#Foundlt-OnAmazon</p>
                            <p className='py-2 hover:bg-[#babebe]  hover:text-black cursor-pointer'>Clearance store</p>
                        </div>
                        <div className="p-5 text-neutral-content border-t-2 border-gray-400">
                            <h2 className='text-[18px] font-semibold mb-2 text-white'>Help & Settings</h2>
                            <p className='py-2 hover:bg-[#babebe] hover:text-black cursor-pointer'>Your Account</p>
                            <p className='py-2 hover:bg-[#babebe]  hover:text-black cursor-pointer'><Link href="/customer">Customer Service</Link></p>
                          </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResponsiveSideBar