"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@radix-ui/themes";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useRouter } from "next/navigation";


const ImageSlider = ({products}:any) => {
  const [positionIndexes, setPositionIndexes] = useState([0, 1, 2, 3, 4,5,6]);
  const router = useRouter();
  const handleNext = () => {
    setPositionIndexes((prevIndexes) => {
      const updatedIndexes = prevIndexes.map(
        (prevIndex) => (prevIndex + 1) % 5
      );
      return updatedIndexes;
    });
  };

  const handleBack = () => {
    setPositionIndexes((prevIndexes) => {
      const updatedIndexes = prevIndexes.map(
        (prevIndex) => (prevIndex + 4) % 5
      );

      return updatedIndexes;
    });
  };

  const handleImageClick = (slug:any) => {
    router.push(`/products/${slug}`);
  };
  
  const positions = ["center", "left1", "left", "right", "right1"];

  const imageVariants = {
    center: { x: "0%", scale: 1, zIndex: 5 },
    left1: { x: "-50%", scale: 0.7, zIndex: 3 },
    left: { x: "-90%", scale: 0.5, zIndex: 2 },
    right: { x: "90%", scale: 0.5, zIndex: 1 },
    right1: { x: "50%", scale: 0.7, zIndex: 3 },
  };
  return (
    <div className="flex items-center bg-[#ebe6e2] flex-col justify-center  h-[350px]
     mt-5 xl:mt-20">
      {products.slice(10,16).map((product:any, index:any) => (
        <div key={product.slug}>
        <motion.img
          key={product.slug}
          src={product.image[0]}
          alt={product.name}
          className="rounded-[12px] max-w-[300px] max-h-[300px] 
          cursor-pointer relative "
          initial="center"
          animate={positions[positionIndexes[index]]}
          variants={imageVariants}
          transition={{ duration: 0.5 }}
          style={{ width: "40%", position: "absolute" }}
          aria-label={product.price}
          onClick={() => handleImageClick(product.slug)}
       />
    
    
        </div>
      ))}
      <div className="flex flex-row gap-5 mt-[300px] xl:mt-[400px]">
        <Button variant="classic" size="3" color="gray" className="py-2 px-4 cursor-pointer"
          onClick={handleBack}
        >
          <MdChevronLeft className=' text-[18px]'/>
          Back
        </Button>
        <Button variant="classic" size="3" color="gray"
          className=" py-2 px-4 cursor-pointer"
          onClick={handleNext}
        >
          Next
          <MdChevronRight className=' text-[18px]' />
        </Button>
      </div>
    </div>
  );
};

export default ImageSlider;
