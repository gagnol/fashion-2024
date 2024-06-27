'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { createProduct } from '@/lib/action'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Button, Heading, TextArea, TextField } from '@radix-ui/themes'
import { FaArrowRight } from 'react-icons/fa'
import SizesInput from '../Create_product/sizes'
import ImageUpload from '../../UploadImage'
import Link from 'next/link'
import BgPage from '../../BgPage'
import ColorsInput from './colorPicker'

export default function CreateForm() {
  const [state, formAction] = useFormState(createProduct, {
    message: '',
  })

  const { pending } = useFormStatus()
  const ref = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.message.indexOf('Created product') === 0) {
      ref.current?.reset()
      toast(state.message)
    } else if (state.message) {
      ref.current?.reset()
      toast.success(state.message, { duration: 4000, position: "top-center", })
    }
  }, [state.message])

  /* Image upload */
  const [images, setImages] = useState<string[]>([])

  const handleImageChange = (url: string) => {
    setImages([...images, url])
  }

  const handleImageRemove = (url: string) => {
    setImages(images.filter(image => image !== url))
  }

  /* Colors */
  const [colors, setColors] = useState<{ name: string, color: string }[]>([])

  const handleColorsChange = (newColors: { name: string, color: string }[]) => {
    setColors(newColors)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (ref.current) {
      const formData = new FormData(ref.current)
      formData.set('image', JSON.stringify(images)) // Serialize images array
      formData.set('colors', JSON.stringify(colors)) // Serialize colors array
      formAction(formData)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <BgPage />
      <div className="w-[550px] mx-auto h-fit flex-col rounded-[5px]
         my-5 opacity-75 border border-[#666] 
         px-[26px] py-[20px] bg-white/10 backdrop-blur-lg shadow-xl ">
        <Heading size="6" color='jade'>Create New Product</Heading>
        <form ref={ref} onSubmit={handleSubmit}>
          <div className="form-control w-full max-w-xs py-4 ">
            <label htmlFor="name">Name</label>
            <TextField.Root
              type="text"
              id="name"
              name="name"
              required
              autoComplete='false'
            />
            <label htmlFor="description">Description</label>
            <TextArea
              id="description"
              name="description"
              className="a_input"
              required
              autoComplete='false'
            />
            <label htmlFor="category">Category</label>
            <TextField.Root
              type="text"
              id="category"
              name="category"
              required
              autoComplete='false'
            />
            <label htmlFor="department">Department</label>
            <TextField.Root
              type="text"
              id="department"
              name="department"
              className="a_input"
              required
              autoComplete='false'
            />
            <label htmlFor="brand">Brand</label>
            <TextField.Root
              type="text"
              id="brand"
              name="brand"
              className="a_input"
              required
              autoComplete='false'
            />
            <div className="flex ">
              <label htmlFor="discount" className='m-2'>Discount</label>
              <input
                type="number"
                id="discount"
                name="discount"
                className="a_input"
                required
              />
              <label htmlFor="countInStock" className='m-2'>Stock</label>
              <input
                type="number"
                id="countInStock"
                name="countInStock"
                className="a_input"
                required
              />
            </div>
            <div className="flex ">
              <label htmlFor="rating" className='m-2'>Rating&nbsp;</label>
              <input
                type="number"
                id="rating"
                name="rating"
                className="a_input"
                required
              />
              
              
              <label htmlFor="slug" className='m-2'>Slug</label>
              <input
                type="text"
                id="slug"
                name="slug"
                className="a_input"
                required
              />
            </div>
            <label htmlFor="image">Image</label>
            <ImageUpload
              value={images}
              onChange={handleImageChange}
              onRemove={handleImageRemove}
            />
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              className="a_input"
              required
              step="0.01"
            />
            <label htmlFor="shipping" className='m-2'>Shipping&nbsp;</label>
              <input
                type="number"
                id="shipping"
                name="shipping"
                className="a_input"
                required
                 step="0.01"
              />
            <label htmlFor="video">Video</label>
            <TextField.Root
              type="text"
              id="video"
              name="video"
              className="a_input"
            />
            <SizesInput />
            <ColorsInput onColorsChange={handleColorsChange} />
          </div>
          <Button size="4" type="submit" variant='surface'>
            Create
          </Button>
          <Button size="4" variant='surface' type="button" mx="2" color='gray' asChild >
            <Link href="/product">
              Back
              <FaArrowRight />
            </Link>
          </Button>
        </form>
      </div>
    </div>
  )
}
