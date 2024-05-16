"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import * as Popover from '@radix-ui/react-popover';
import { MixerHorizontalIcon, Cross2Icon } from '@radix-ui/react-icons';
import { addUser, removeUser } from "@/store/nextSlice"
import { signOut, useSession } from "next-auth/react";
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { Avatar, Button } from '@radix-ui/themes'

function SigninTool() {
    const { data: session } = useSession();
    const dispatch = useDispatch();
   
    useEffect(() => {
        if (session) {
            dispatch(
                addUser({
                    ...session

                })
            );
        }
    }, [dispatch, session]);

    const router = useRouter();

    const handleSignOutClick: React.MouseEventHandler<HTMLLIElement> = (event) => {
           
        // Redirect to "/" before signing out
        router.push('/');
    
        // Wait for 2 seconds before executing signOut
        setTimeout(() => {
            removeUser();
            signOut({ redirect: false });
        }, 2000);
    };
    return (
        <>
            {session?.user ? (
                <>
                    <div >
                    <Popover.Root >
                        <Popover.Trigger >
                    <Avatar
                    size="4"
                    src={session?.user?.image || undefined }
                    fallback="A"
                    />    
                        </Popover.Trigger>
                        <Popover.Portal>
                        <Popover.Content >
                            <div className='bg-[#141726] w-[360px] h-[320px] rounded-lg border-[2px]'>
                            <div className="a_tooltip-header ">
                                <Image src={session?.user?.image || ''} alt="" 
                                width={100} height={100}
                                className="w-11 h-11 rounded-full object-cover"
                                />
                                <div className="text-xs text-gray-600 flex flex-col pl-5 pt-2">
                                    <p className="text-black font-bold text-[18px]">
                                        {session.user.name}</p>
                                    <p>{session?.user?.email}</p>
                                </div>
                            </div>
                            <div className='flex justify-between z-30 absolute '>
                                <div className='a_list_left'>
                                    {session?.user?.email === "admin@example.com"}
                                    <ul className='m-0 p-0'>
                                        <h4 className='text-[16px] font-bold py-2 text-white'>
                                            Your List </h4>
                                        
                                        <Link href="/main">
                                            {session?.user?.email === "admin@example.com" ?
                            (<li className="nav_text font-bold">Dashboard</li>) : (<></>)
                                            }
                                        </Link>
                                    </ul>
                                </div>
                                <div className='border-l-[2px] border-l-[#fff] '></div>
                                <div className='flex-1 flex flex-row max-w-[50%] min-w-[50%] relative mx-4 my-0 '>
                                    <ul>
                                        <h4 className='text-[16px] font-bold py-2 text-white '>
                                            Your Account
                                       </h4>
                                        <li className="nav_text">
                                            <Link href="/profile">
                                                Account
                                            </Link>
                                        </li>
                                        <li className="nav_text">Orders</li>
                                        <li className="nav_text">Recommendations</li>
                                        
                                        <li className="nav_text"> 
                                         <Link href="/customer">
                                        Customer Services 
                                        </Link>
                                        </li>

                                        <li className="nav_text" onClick={handleSignOutClick}>
                                            Signout
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            </div>
                            <Popover.Close
          className="rounded-full h-[25px] w-[25px] inline-flex 
          items-center justify-center text-violet11 absolute top-[5px] 
          right-[5px] hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 
          outline-none cursor-default"
          aria-label="Close"
        >
          <Cross2Icon />
        </Popover.Close>
        <Popover.Arrow className="fill-white" />
                        </Popover.Content>
                      </Popover.Portal>
                        </Popover.Root>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <div className='block'>
                        <Button  variant='classic' size="3" color='gray' >
                        <Link href="/signin" >
                        Signin
                        </Link>
                        </Button>
                      </div>
                   </div>
                </>)}
        </>
    )
}

export default SigninTool
