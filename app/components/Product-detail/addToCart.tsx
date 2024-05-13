"use client"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '@/store/nextSlice';
import toast from 'react-hot-toast';
import { Button } from '@radix-ui/themes';

interface AddToCartProps {
  product: any;
  discountPrice:number

}
const AddCart: React.FC<AddToCartProps> = ({ product,discountPrice }) => {

  const { colorPiked,sizePiked } = useSelector((state: any) => state.next);
  
  const dispatch = useDispatch();
  return (
    <>
      <Button variant='classic' color='amber' size="4"
        onClick={() =>
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
            }),
            toast.success('Your product adds to your cart', { duration: 4000, position: "top-center", })
          )
        } >
        Add to Cart
      </Button>

    </>
  )
}

export default AddCart
