"use client"
import { Button, Heading, Quote, Separator, Strong, Text } from '@radix-ui/themes';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { FaChevronRight } from 'react-icons/fa6';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function Special() {
  const calculateTimeLeft = (): TimeLeft => {
    const targetDate = new Date('2024-12-31T23:59:59'); // Set your target date
    const currentTime = new Date();
    const difference = targetDate.getTime() - currentTime.getTime();

    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="max-w-screen-2xl w-full mx-auto my-20 h-full bg-[#f0f0f0] p-20"
      id="collection"
      aria-label="collection"
    >
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
        <div className="overflow-hidden col-span-1 xl:col-span-1 items-center flex justify-center">
          <Image
            src="/art2.jpg"
            width={305}
            height={408}
            alt="offer products"
            className="w-100"
          />
        </div>
        <div className="overflow-hidden col-span-1 xl:col-span-2 flex justify-center">
          <Image
            src="/art5.jpg"
            width={450}
            height={625}
            alt="offer products"
            className="w-100"
          />
        </div>
        <div className="overflow-hidden col-span-1 xl:col-span-2">
          <div className="block">
                <Heading size="6" mb="2">
                Special Offer
                </Heading>
          <Quote>
            Don&apos;t miss Today&apos;s offers for a limited time
          </Quote>
          <div className="my-10 flex space-x-4">
            {/* Countdown Timer */}
            <div className="w-[70px] text-center items-center space-y-2 block border-2 shadow-lg p-2">
              <Text size="3">Days</Text><br/>
              <Text size="5">{timeLeft.days}</Text>
            
            </div>
            <div className=" text-center items-center space-y-2 block border-2 shadow-lg p-2">
            <Text size="3">Hours</Text><br/>
              <Text size="5">{timeLeft.hours}</Text>
              
            </div>
            <div className=" text-center items-center space-y-2 block border-2 shadow-lg p-2">
            <Text size="3">Minutes</Text><br/>
            <Text size="5">{timeLeft.minutes}</Text>
              
            </div>
            <div className=" text-center items-center space-y-2 block border-2 shadow-lg p-2">
            <Text size="3">Seconds</Text><br/>
            <Text size="5">{timeLeft.seconds}</Text>
            </div>
          </div>
            </div>
          <div className="mb-10 mt-1 py-5">
            <Text size="8">Mountain Pine Bath Oil</Text>
            <br />
            <Separator size='4'/>
            <br />
            <Text size="4">
              Made using clean, non-toxic ingredients, 
              our products are designed for everyone.
            </Text>
            <br />
            <br />
            <Text size="4">
            Get Only At
            </Text>
            <Text size="7" mx="6">
            <span className='text-base leading-7'>$</span> <Strong>39.99</Strong>
            </Text>
            <br />
            <br />
          
            <Button variant='classic'size="3" color='gray'   >
              Shop Now
              <FaChevronRight />
            </Button>
            
          </div>
         </div>
      </div>
    </section>
  );
}

export default Special;
