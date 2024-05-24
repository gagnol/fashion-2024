'use client'
import { useFormState, useFormStatus } from 'react-dom'
import { createProduct } from '@/lib/action'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Button, Heading  } from '@radix-ui/themes'
import { FaArrowRight } from 'react-icons/fa'

interface StringArrayInputProps { }


export default function CreateForm() {
  const [state, formAction] = useFormState(createProduct, {
    message: '',
  })

  const { pending } = useFormStatus()
  const ref = useRef<HTMLFormElement>(null)
  useEffect(() => {
    if (state.message.indexOf('Created product') === 0) {
      ; (document.getElementById('my_modal_3') as any)!.close()
      ref.current?.reset()
      toast(state.message)
    } else if (state.message) {
      toast.success(state.message, { duration: 4000, position: "top-center", })
    }
  }, [state.message])

  return (
    <div>
      <Button size="2"
        
        onClick={() =>
          (document.getElementById('my_modal_3')! as any).showModal()
        }
      >
        Create Product
      </Button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box justify-center items-center w-full mx-auto">
          <Heading size="6" color='gray'>Create Product</Heading>
          <form ref={ref} action={formAction}>
            <div className="form-control w-full max-w-xs py-4">
              <label htmlFor="name">Name</label>
             <input
                type="text"
                id="name"
                name="name"
                required
                autoComplete='false'
              />
              
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                className="a_input"
                required
                autoComplete='false'
              />

              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                className="a_input"
                required
                autoComplete='false'
              />
              <label htmlFor="department">Department</label>
              <input
                type="text"
                id="department"
                name="department"
                className="a_input"
                required
                autoComplete='false'
              />
              <label htmlFor="brand">Brand</label>
              <input
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
                  type="number"
                  id="slug"
                  name="slug"
                  className="a_input"
                  required
                />
              </div>
              <label htmlFor="image">Image</label>
              <input
                type="text"
                id="image"
                name="image"
                className="a_input"
                required
              />
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                className="a_input"
                required
                defaultValue="1"
              />
               <label htmlFor="video">Video</label>
              <input
                type="text"
                id="video"
                name="video"
                className="a_input"
                />
             
            </div>
            
            <Button
              size="2"
              type="submit"
              variant='surface'
            >
              Create
            </Button>
            
            
            <Button size="2" variant='surface'
              type="button" mx="2"
              color='gray'
              onClick={() =>
                (document.getElementById('my_modal_3') as any).close()
              }
            >
              Back
              <FaArrowRight />
            </Button>
            
          </form>
        </div>
      </dialog>
    </div>
  )
}