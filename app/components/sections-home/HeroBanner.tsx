"use client"
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Button } from "@radix-ui/themes";
import Image from "next/image";

const HeroBanner = () => {
    return (
        <div className="relative  text-[20px] w-full max-w-[1540px] mx-auto">
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
                showIndicators={false}
                showStatus={false}
                interval={6000}    >
               
                <div>
                    <Image alt="banner" width={1500} height={400}
                        src="/ban5.png"
                        className="aspect-[16/10] md:aspect-auto object-cover max-h-[400px]"
                        style={{ objectPosition: 'top' }}
                    />
                    
                </div>
                <div>
                    <Image alt="banner" width={1500} height={400}
                        src="/ban4.png"
                        className="aspect-[16/10] md:aspect-auto object-cover max-h-[400px]"
                        style={{ objectPosition: 'top' }}
                    />
                    
                </div>
            </Carousel>
        </div>
    );
};

export default HeroBanner;
