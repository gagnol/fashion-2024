'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import * as Tabs from '@radix-ui/react-tabs';

interface Prop {
  item: any;
  i: number;
}

const TabsComponent = ({ product, setIndex, index }: any) => {


  return (

    <Tabs.Root
      className="flex flex-col w-[600px] shadow-[0_2px_10px] shadow-blackA2"
      defaultValue="tab1"
    >
      <Tabs.List className="shrink-0 flex border-b border-mauve6" aria-label="Image Gallery">
        <Tabs.Trigger
          className="bg-slate-400 px-5 h-[45px] flex-1 flex items-center justify-center
         text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md 
         last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11
          data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current
           data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px]
           data-[state=active]:focus:shadow-black outline-none cursor-default"
          value="tab1">
          Videos
        </Tabs.Trigger>
        <Tabs.Trigger value="tab2" className=" px-5 h-[45px] flex-1 flex items-center 
          justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md 
          last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 
          data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current
           data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px]
           data-[state=active]:focus:shadow-black outline-none cursor-default">
          Image Gallery
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className="grow p-5 rounded-b-md 
    outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
        value="tab1">
        {product.video?.map((item: any, i: number) => (
          <div className="inline-flex justify-between mx-4" key={i}>
            <video width={300} height={300} className="max-h-[300px] min-h-[300px]" muted={false}
              controls={true} playsInline preload="auto" id="miVideo">
              <source
                key={i}
                src={(item)}
                type="video/mp4"
                onMouseEnter={() => setIndex(i)}
              />
            </video>
          </div>
        ))}
      </Tabs.Content>
      <Tabs.Content
        className="grow p-5 bg-white rounded-b-md 
          outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
        value="tab2">
        <div className=' p-4'>

          <div className="flex flex-wrap justify-start mx-5">
            <Image
              src={product.image[index]}
              alt={product.name}
              width={283}
              height={283}
              sizes="100vw"
              className="xl:max-h-[283px] xl:min-h-[283px] xl:min-w-[283px] 
              min-h-[283px] min-w-[283px] max-h-[283px] rounded-md"
            />
            <div className="flex flex-wrap justify-start mx-5">
              {product.image?.map((item: any, i: number) => (
                <div className='inline-flex justify-between mt-4 border-transparent border-[3px]
      max-h-[100px]
          hover:border-[#c45500] cursor-pointer'
                  key={i}>
                  <Image
                    width={100}
                    height={100}
                    className="max-h-[100px] min-h-[100px]"
                    alt=""
                    key={i}
                    src={(item)}
                    onMouseEnter={() => setIndex(i)}
                    loading='lazy'
                  />
                </div>
              ))}

            </div>
          </div>
        </div>
      </Tabs.Content>

    </Tabs.Root>

  );
};

export default TabsComponent;

