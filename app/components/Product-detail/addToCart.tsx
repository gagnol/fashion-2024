"use client"
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '@/store/nextSlice';
import toast from 'react-hot-toast';
import { Button } from '@radix-ui/themes';
import { resetPickedValues } from '@/store/nextSlice'

interface AddToCartProps {
  product: any;
  discountPrice: number;
}

const AddCart: React.FC<AddToCartProps> = ({ product, discountPrice }) => {
  const { colorPiked, sizePiked } = useSelector((state: any) => state.next);
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    if (sizePiked === "") {
      // If sizePiked is empty, show toast message and prevent adding to cart
      toast.error('You have to choose a size', { duration: 4000, position: "top-center" });
    } else {
      // Otherwise, dispatch action to add product to cart
      dispatch(
        addCart({
          _id: product._id,
          brand: product.brand,
          category: product.category,
          description: product.description,
          image: product.image[0],
          price: product.price,
          name: product.name,
          video: [""],
          slug: "",
          subcategory: "",
          rating: 0,
          numReviews: 0,
          countInStock: product.countInStock,
          isFeature: "",
          discount: 0,
          topDeal: "",
          bestSeller: "",
          colors: [""],
          countryData: [""],
          discountPrice: discountPrice,
          quantity: 1,
          shipping: product.shipping,
          colorPiked: colorPiked,
          sizePiked: sizePiked
        })
      );
      dispatch(resetPickedValues()); // Dispatch the action to reset picked values
      toast.success('Your product adds to your cart', { duration: 4000, position: "top-center" });
    }
  };

  return (
    <Button variant='surface'  size="3" my="3" style={{ width: "100%" }} 
    onClick={addToCartHandler}>
      Add to Cart
    </Button>
  );
};

export default AddCart;
