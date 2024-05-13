"use client"

import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Cardgrid from "./sections-home/Card";


function Slider({ product }:any) {

    const slideLeft = () => {
        var slider = (document.getElementById('slider')as any);
        slider.scrollLeft = slider.scrollLeft - 500;
    };

    const slideRight = () => {
        var slider =( document.getElementById('slider')as any);
        slider.scrollLeft = slider.scrollLeft + 500;
    };

    return (
        <>
            <div className='flex items-center mx-10 py-5'>
                <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100 text-white' 
                onClick={slideLeft} size={40} />
                <div   id='slider'
                    className='flex w-full h-full overflow-x-scroll scroll whitespace-nowrap 
                      scroll-smooth scrollbar-hide'>
                  <Cardgrid product={product}/>
                </div>
                <MdChevronRight className='opacity-50 cursor-pointer text-white
                hover:opacity-100' onClick={slideRight} size={40} />
            </div>
        </>
    );
}

export default Slider;