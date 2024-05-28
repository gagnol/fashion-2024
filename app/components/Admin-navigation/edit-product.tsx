'use client'
import React, { useState } from 'react'
import { FaArrowRight, FaSave } from "react-icons/fa";
import Link from "next/link";
import { Button, Strong, Text, TextArea, TextField } from "@radix-ui/themes";
import { useFormState, useFormStatus } from 'react-dom'
import {  updateProduct } from '@/lib/action'
import Image from 'next/image';
import toast from 'react-hot-toast';

  
export default function EditForm({ product }: any) {

    
  const [state, formAction] = useFormState( updateProduct, {
    message: '',
  })
  

    return (
        <div>
            <div className="bg-[#141726] p-4 rounded-lg justify-center text-center w-full mx-auto">
                <Text size="5" ><Strong>Edit Product</Strong></Text>
                <form    action={async (formData) => {
              const res = await  updateProduct(null, formData)
              toast.success(res.message, { duration: 4000, position: "top-center", })
            }}
          >
                    <div className="form-control w-full  py-4">
                    <input
                type="hidden"
                id="_id"
                name="_id"
                className="a_input"
                required
                autoComplete='off'
                defaultValue={product._id}
              />
                        <label htmlFor="name">Name</label>
                        <TextField.Root
                            type="text"
                            id="name"
                            name="name"
                            className="a_input"
                            required
                            autoComplete='false'
                            defaultValue={product.name}
                        />

                        <label htmlFor="description">Description</label>
                        <TextArea
                            
                            id="description"
                            name="description"
                            required
                            autoComplete='false'
                            defaultValue={product.description}
                        />
                        <div className="flex flex-wrap ">
                            <label htmlFor="category" className='m-2'>Category</label>
                            <TextField.Root
                                type="text"
                                id="category"
                                name="category"
                                className="a_input_sm"
                                required
                                autoComplete='false'
                                defaultValue={product.category}
                            />
                            <label htmlFor="department" className='m-2'>Dept</label>
                            <TextField.Root
                                type="text"
                                id="department"
                                name="department"
                                className="a_input_sm"
                                required
                                autoComplete='false'
                                defaultValue={product.department}
                            />
                            <label htmlFor="brand" className='m-2'>Brand&nbsp;&nbsp;</label>
                            <TextField.Root
                                type="text"
                                id="brand"
                                name="brand"
                                className="a_input_sm"
                                required
                                autoComplete='false'
                                defaultValue={product.brand}
                            />
                            <label htmlFor="price" className='m-2'>Price</label>
                            <TextField.Root  style={{ width: "fit-content" }}
                                type="number"
                                id="price"
                                name="price"
                                required
                                autoComplete='false'
                                defaultValue={product.price}
                                step="0.01"
                            />
                        </div>
                        <div className="flex flex-wrap ">
                            <label htmlFor="discount" className='m-2'>Discount</label>
                            <TextField.Root
                                type="number"
                                id="discount"
                                name="discount"
                                className="a_input_sm"
                                required
                                autoComplete='false'
                                defaultValue={product.discount}
                            />
                            <label htmlFor="countInStock" className='m-2'>Stock</label>
                            <TextField.Root
                                type="number"
                                id="countInStock"
                                name="countInStock"
                                className="a_input_sm"
                                required
                                autoComplete='false'
                                defaultValue={product.countInStock}
                            />
                            <label htmlFor="rating" className='m-2'>Rating&nbsp;</label>
                            <TextField.Root
                                type="number"
                                id="rating"
                                name="rating"
                                required
                                autoComplete='false'
                                defaultValue={product.rating}
                            />
                            <label htmlFor="slug" className='m-2'>Slug</label>
                            <TextField.Root
                                type="number"
                                id="slug"
                                name="slug"
                                required
                                autoComplete='false'
                                defaultValue={product.slug}
                            />
                             
                        </div>
                        {product.image.map((img: any, index: number) => (
                            <div className="flex flex-wrap" key={index}>
                                <label htmlFor={`image-${index}`}>Image {index + 1}</label>
                                <Image src={img} alt="" width={50} height={50} className='rounded-md m-2' />
                                <TextField.Root
                                    type="text"
                                    id={`image-${index}`}
                                    name={`image-${index}`}
                                    required
                                    autoComplete='false'
                                    defaultValue={img}
                                />
                            </div>
                        ))}
                
                        <div className="flex flex-wrap">
                            <label htmlFor="feature" className='m-2'>Feature</label>
                            <TextField.Root
                                type="text"
                                id="feature"
                                name="feature"
                                className="a_input_sm"
                                autoComplete="off"
                                defaultValue={product.isFeature}
                            />
                               <label htmlFor="topDeal" className='m-2'>topDeal</label>
                            <TextField.Root
                                type="text"
                                id="topDeal"
                                name="topDeal"
                                className="a_input_sm"
                                autoComplete="off"
                                defaultValue={product.topDeal}
                            />
                                <label htmlFor="bestSeller" className='m-2'>bestSeller</label>
                            <TextField.Root
                                type="text"
                                id="bestSeller"
                                name="bestSeller"
                                className="a_input_sm"
                                autoComplete="off"
                                defaultValue={product.bestSeller}
                            />
                        </div>
        
                    <label htmlFor="video">Video</label>
                    <TextField.Root
                        type="text"
                        id="video"
                        name="video"
                        className="a_input"
                        autoComplete='false'
                        defaultValue={product.video}
                    />
                    <div className='flex flex-wrap '>
                       {product.sizes.map((size: any, index: number) => (
                            <div className="flex flex-wrap" key={index}>
                                <label htmlFor={`size-${index}`} 
                                className='mx-2 align-middle'>Size {index + 1}</label>
                                
                                <TextField.Root
                                    type="text"
                                    id={`size-${index}`}
                                    name={`size-${index}`}
                                    className="a_input_sm"
                                    required
                                    autoComplete='false'
                                    defaultValue={size}
                                />
                            </div>
                        ))}
                    </div>
                    <div>
                    {product.colors.map((color:any, index:number) => (
                <div className="flex flex-wrap" key={index}>
               <div
            className="w-6 h-6 rounded-full"
            style={{ backgroundColor: color.color }}
          ></div>
          <label htmlFor={`color-name-${index}`} className="mx-2 align-middle">
            Color Name {index + 1}
          </label>
          <TextField.Root
            type="text"
            id={`color-name-${index}`}
            name={`color-name-${index}`}
            className="a_input_sm"
            required
            autoComplete="off"
            defaultValue={color.name}
          />
          <label htmlFor={`color-value-${index}`} className="mx-2 align-middle">
            Color Value
          </label>
          <TextField.Root
            type="text"
            id={`color-value-${index}`}
            name={`color-value-${index}`}
            className="a_input_sm"
            required
            autoComplete="off"
            defaultValue={color.color}
          />
        
        </div>
      ))}
        </div>
            </div>
            <div className='flex flex-wrap justify-around mx-auto w-full'>
                <div>
                    <Button size="3" type="submit" variant='surface' >
                        Save
                        <FaSave />
                    </Button>
                </div>
                <div>
                    <Button size="3" variant='surface'
                        type="button" asChild
                    >
                        <Link href="/product">
                            Back
                            <FaArrowRight />
                        </Link>
                    </Button>
                </div>
            </div>
        </form>
            </div >
        </div >
    )
}
