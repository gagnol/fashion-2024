"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { footerLinks } from "@/constant";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { BsTwitter, BsPinterest } from "react-icons/bs";


const FooterColumnMiddle = ({ title, links }:any) => (
    <div className="mx-auto">
        <h3 className="font-semibold m-1 text-white">{title}</h3>
        <ul className="footer_ul m-1">
            {links.map((link:any) => <Link href="/" key={link} className='text-[13px]
            text-white mb-1 relative block pt-5 hover:underline'>{link}</Link>)}
        </ul>
    </div>
);

const Footer = () => {

    const ScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <>
            <footer>
                <div className="footer_back" onClick={ScrollToTop}>
                    <a>Back to Top</a>
                    
                </div>
                <div className="footer_middle ">
                    <FooterColumnMiddle title={footerLinks[0].title} links={footerLinks[0].links} />
                    <FooterColumnMiddle title={footerLinks[1].title} links={footerLinks[1].links} />
                    <FooterColumnMiddle title={footerLinks[2].title} links={footerLinks[2].links} />
                    <FooterColumnMiddle title={footerLinks[3].title} links={footerLinks[3].links} />
                </div>
                <div className='block bg-[#141726]'>
                    <div className='flex w-full items-center justify-center pt-2 text-center border-t' >
                        <Link href="/" >
                            <Image
                                alt='logo'
                                width={100}
                                height={100}
                                style={{ width: 100, height: "auto" }}
                                src='https://m.media-amazon.com/images/S/al-na-9d5791cf-3faf/fcf7ac46-f921-4b66-b183-8db87d9e61eb._CR0%2C0%2C1800%2C1800_SX200_.png'
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                loading='lazy'
                            />
                        </Link>
                       </div>
                       <div className=' w-full items-center justify-center 
                        p-1 text-center '>
                       <div className="flex w-full items-center justify-center 
                         text-center gap-8 text-[#5e514b] text-2xl">
                            <Link href="/"
                             className='cursor-pointer hover:text-[#5e514b]'>
                            <FaFacebookF className='text-[#58abb3] hover:text-[#5e514b]'/>
                            </Link>
                            <BsTwitter className='text-[#58abb3] hover:text-[#5e514b]'/>
                            <BsPinterest className='text-[#58abb3] hover:text-[#5e514b]'/>
                            <FaLinkedinIn className='text-[#58abb3] hover:text-[#5e514b]'/>
                        </div>
                    </div>
                </div>
                <div className="footer_bottom ">
                    <div className='footer_copyright text-white pt-1 mx-auto'>
                       
                    <div className="flex gap-10 mx-auto justify-center">
                            <p className='text-[14px] relative hover:underline cursor-pointer'>Terms and Conditions</p>
                            <Link href="/aviso">
                            <p className='text-[14px] relative hover:underline cursor-pointer'>Privacy</p>
                            </Link>
                            <Link href="/cookies">
                            <p className='text-[14px] relative hover:underline cursor-pointer'>
                               Cookies Policy</p>
                            </Link>
                        </div>
                         <p className='text-center pt-5'>Copyrigth &copy; 2023-{new Date().getFullYear()},
                          Legendary, all rigths reserved.</p>
                        <br/>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
