"use client"
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Button } from "@radix-ui/themes";

const HeroBanner = () => {
    return (
        <div className="relative text-white text-[20px] w-full max-w-[1550px] mx-auto">
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
                showIndicators={false}
                showStatus={false}
                interval={6000}    >
                <div>
                    <img
                        src="/legendarylife.png"
                        className="aspect-[16/10] md:aspect-auto object-cover max-h-[400px]"
                        style={{ objectPosition: 'top' }}
                    />
                    <div className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] 
                    font-oswald bg-transparent absolute bottom-[25px] md:bottom-[300px] left-10                     text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium 
                     hover:opacity-90">
                        <Button variant="classic" color="gray" size="4" className="cursor-pointer">Shop Now</Button>
                    </div>
                </div>
                <div>
                    <img
                        src="/ban5.png"
                        className="aspect-[16/10] md:aspect-auto object-cover max-h-[400px]"
                        style={{ objectPosition: 'top' }}
                    />
                    
                </div>
                <div>
                    <img
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
