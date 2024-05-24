'use client'

import { updateOrder } from '@/lib/order-actions'
import { Button } from '@radix-ui/themes'
import { useFormState, useFormStatus } from 'react-dom'
import toast from 'react-hot-toast'

export default function UpdateForm({ _id,orderStatus}: {_id: string,orderStatus:string}) {

  const [state, formAction] = useFormState(updateOrder, {
    message: '',
  })
  const { pending } = useFormStatus()

  return (
    <div>
    
           <form
            action={async (formData) => {
              const res = await updateOrder(null, formData)
              toast.success(res.message, { duration: 4000, position: "top-center", })
            }}
          >
            <input type="hidden" name="_id" value={_id} />
            <input type="hidden" name="orderStatus" value={orderStatus} />
            <Button size="2" variant='surface' type="submit" >
              Update
            </Button>
            
          </form>
       </div>
  )
}