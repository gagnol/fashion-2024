"use client"
import { Button } from '@radix-ui/themes';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Hero = ({slides}:any) => {
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const imageRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => {
        const nextSlide = (prevSlide + 1) % slides.length;
        return nextSlide;
      });
    }, 14000); // Change slide every 14 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [slides.length]);

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current; // Autoplay image when slide changes
    }
  }, [currentSlide]);

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative flex flex-col  pb-2 w-full 
    min-h-[550px] max-md:max-w-full">
      <div className="relative overflow-hidden w-full min-h-[550px]">
      
        <Image
          ref={imageRef}
          src={slides[currentSlide].image}
          className="object-cover absolute inset-0 w-full h-full"
          alt="banner"
          width={1500} height={600}
        />
        <div className="flex relative gap-5 justify-between mt-4 w-full text-4xl font-bold text-white leading-[50px] max-md:flex-wrap max-md:max-w-full">
          <FaChevronLeft
            className="shrink-0 self-center 
            mt-[225px] max-w-full aspect-square 
            w-[100px] max-md:mt-10 cursor-pointer hover:text-[#999]"
            onClick={goToPrevSlide}
          />
          <div className="grow px-5 py-9 bg-transparent 
          w-fit max-md:max-w-full">
            {slides[currentSlide].text}
          </div>
          <FaChevronRight
            className="shrink-0 self-center mt-[225px] 
            max-w-full aspect-square w-[100px] 
            max-md:mt-10 cursor-pointer hover:text-[#999]"
            onClick={goToNextSlide}
          />
        </div>
        <div className="flex relative flex-col self-center mt-6 
          w-full max-w-[800px] max-md:max-w-full">
          <div className="self-center px-10 py-3 max-md:px-5">
            <Button variant='classic'size='4' asChild >
            <Link  href={`/products/${slides[currentSlide].link}`} >
            SHOP NOW
            </Link>
            </Button>
          </div>
          <div className="flex gap-4 self-center mt-20 max-md:mt-10">
            {slides.map((_: any, index: React.Key | null | undefined) => (
              <div
                key={index}
                className={`justify-center items-center 
                  shrink-0 w-5 h-5 rounded-full 
                    border border-white 
                    border-solid ${index === currentSlide ? 'bg-white'
                       : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;