"use client"
import Image from 'next/image';
import { useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Modal from '../Modal';
import TabsComponent from './tabs';
import { Text } from '@radix-ui/themes';

const ImageGallery = ({ product }: any) => {
  const [index, setIndex] = useState(0);

  const [showModal, setShowModal] = useState(false);

  const openModalHanlder = () => {
    setShowModal(true);
  };

  const closeModalHanlder = () => {
    setShowModal(false);
  };

  const videoCounter = product.video.length;
  const imageCounter = product.image.length;

  return (

    <div className='z-60'>
      <Zoom>
        <Image
          src={product.image[index]}
          alt={product.name}
          width={483}
          height={483}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className="xl:max-h-[483px] xl:min-h-[483px] xl:min-w-[483px] 
          min-h-[283px] min-w-[283px] max-h-[283px] rounded-md"
        />
      </Zoom>
      <Text size="1" color='gray' mx="9">
        Click image to open expanded view
      </Text>
      <div>
        {product.image?.map((item: any, i: number) => (
          <div className='inline-flex justify-between mt-4 ml-3 border-transparent 
          border-[3px]  hover:border-[#c45500] cursor-pointer rounded-md' key={i}>
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
        )).slice(0, 3)}
        <div className="inline-flex overflow-hidden relative border-transparent border-[3px] 
        mt-4 ml-4 hover:border-[#c45500] cursor-pointer rounded-md" onClick={openModalHanlder}>
          <Image
            width={100}
            height={100}
            className="max-h-[100px] min-h-[100px]"
            alt=""
            src="/Videos.png"
          />
          <span className="text-[14px] absolute w-full h-[50%] text-center text-primary 
                      transition ease-in-out delay-150 overflow-hidden bottom-[-30px] bg-base-200
                      hover:bottom-[-0px]">
            {videoCounter}&nbsp;videos
            <br />
            {imageCounter}&nbsp;images
          </span>
        </div>
        <Modal
          isOpen={showModal}
          onDismiss={closeModalHanlder}
          title=''
        >
          <div className="flex rounded-[8px]  w-[600px] h-[600px] bg-[#141726]" >
            <TabsComponent product={product} setIndex={setIndex} index={index} />
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default ImageGallery;