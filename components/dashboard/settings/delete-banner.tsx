'use client'

import { deleteBannerProduct, deleteProduct } from '@/lib/action'
import { Button } from '@radix-ui/themes'
import { useFormStatus } from 'react-dom'
import toast from 'react-hot-toast'
import { FaTrash } from 'react-icons/fa'

export default function DeleteForm({
  _id,
  
}: {
  _id: string
  
}) {
  const { pending } = useFormStatus()

  return (
    
    <form
      action={async (formData) => {
        const confirmReset = window.confirm(
          "Are you sure to delete this product?"
        );
        if (confirmReset) {
        const res = await  deleteBannerProduct(formData)
        toast.success(res.message, { duration: 4000, position: "top-center", })}
      }}
    >
      <input type="hidden" name="_id" value={_id} />
      
      <Button size="1" color='ruby' variant='surface' type="submit" >
        Delete
        <FaTrash/>
      </Button>
    </form>
  )
}