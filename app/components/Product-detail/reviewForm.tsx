"use client"
import { updateReview } from '@/lib/user-action'
import React, { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import toast from 'react-hot-toast'
import { Button, Dialog, Flex, Text, TextArea, TextField } from '@radix-ui/themes'
import Stars from '../Stars'

export default function ReviewForm({ session, product }: any) {

  const [state, formAction] = useFormState(updateReview, {
    message: '',
  })
  const { pending } = useFormStatus()

  const [rating, setRating] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility

  // Function to handle checkbox selection
  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  // Function to handle form submission
  const handleSubmit = async (formData: any) => {
    const res = await updateReview(null, formData);
    toast.success(res.message, { duration: 4000, position: "top-center" });
    setIsDialogOpen(false); // Close the dialog after submission
  };

  return (
    <div className="py-5">
      <p>Review this product</p>
      <p className='text-[14px] my-2'>
        Share your thoughts with other customers
      </p>

      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Trigger>
          <Button onClick={() => setIsDialogOpen(true)}>Post your review</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Write your review</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Share your thoughts with other customers.
          </Dialog.Description>
 
          <Flex direction="column" gap="3">
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                await handleSubmit(formData);
              }}>

              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Subject
                </Text>
                <TextField.Root
                  type="text"
                  id="subject"
                  name="subject"
                  className="px-[7px] py-[3px] mb-2 border-[#949494] border-[1px] rounded-[3px] font-extralight"
                  required
                  autoComplete='false'
                />
              </label>
              <input
                type="hidden"
                id="productId"
                name="productId"
                defaultValue={product._id}
              />
              <input
                type="hidden"
                id="email"
                name="email"
                defaultValue={session?.user?.email}
              />
              <input
                type="hidden"
                id="name"
                name="name"
                defaultValue={session?.user?.name}
              />
              <input
                type="hidden"
                id="avatar"
                name="avatar"
                defaultValue={session?.user?.image}
              />
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Review this product
                </Text>
                <TextArea
                  id="review"
                  name="review"
                  required
                  autoComplete='false'
                  defaultValue=""
                />
              </label>
              <div className="form-control w-full max-w-xs py-4">
                <h3>Your rating</h3>
                <Stars value={rating || 0} />
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <React.Fragment key={value}>
                      <label htmlFor={`rating_${value}`} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`rating_${value}`}
                          name="rating"
                          value={value}
                          onChange={() => handleRatingChange(value)}
                          checked={rating === value}
                          className="mr-1"
                        />
                        {value}
                      </label>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <Flex gap="3" mt="4" justify="end">
                <Button variant='classic' size="3" type="submit" disabled={pending}>
                  Post your review
                </Button>
              </Flex>
            </form>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  )
}
