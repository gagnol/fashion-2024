'use client'
import React, { useState } from 'react'
import { FaArrowRight, FaSave } from "react-icons/fa";
import Link from "next/link";
import { Button, Strong, Text, TextArea, TextField } from "@radix-ui/themes";
import { useFormState, useFormStatus } from 'react-dom'
import {  updateBannerProduct, updateProduct } from '@/lib/action'
import Image from 'next/image';
import toast from 'react-hot-toast';


  
export default function EditForm({ product }: any) {

    
  const [state, formAction] = useFormState( updateBannerProduct, {
    message: '',
  })
  

    return (
        <div>
            <div className=" p-4 rounded-lg justify-center text-center w-full mx-auto">
                <Text size="5" ><Strong>Edit Product</Strong></Text>
                <form  action={async (formData) => {
              const res = await  updateBannerProduct(null, formData)
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
              <label htmlFor="text">Text</label>
                        <TextField.Root
                            type="text"
                            id="text"
                            name="text"
                            className="a_input"
                            required
                            autoComplete='false'
                            defaultValue={product.text}
                        />
           <label htmlFor="image" className='m-2'>Image</label>
                            <TextField.Root
                                type="text"
                                id="image"
                                name="image"
                                className="a_input_sm"
                                required
                                autoComplete='false'
                                defaultValue={product.image}
                            />
                                <label htmlFor="link" className='m-2'>Link</label>
                            <TextField.Root
                                type="text"
                                id="link"
                                name="link"
                                className="a_input_sm"
                                required
                                autoComplete='false'
                                defaultValue={product.link}
                            />
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
                        <Link href="/admin/settings">
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
