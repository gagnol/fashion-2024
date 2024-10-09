"use client";
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import { FaSave } from 'react-icons/fa';
import { createComunicador } from '@/lib/action';
import { FaPlus } from 'react-icons/fa6';

export default function BannerForm() {
 
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility
 
    // Function to handle form submission
  const handleSubmit = async (formData: any) => {
    const res = await  createComunicador(null, formData);
    toast.success(res.message, { duration: 4000, position: "top-center" });
    setIsDialogOpen(false); // Close the dialog after submission
  };

  return (
    <div className="py-5">
      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Trigger>
          <Button onClick={() => setIsDialogOpen(true)}>
            <FaPlus/> Add Banner
           </Button>
        </Dialog.Trigger>
        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Add New Banner</Dialog.Title>
          <Flex direction="column" gap="3">
            <form 
              onSubmit={async (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                await handleSubmit(formData);
              }}
            >
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Banner Text
                </Text>
                <TextField.Root
                  type="text"
                  id="text"
                  name="text"
                  className="px-[7px] py-[3px] mb-2 border-[#949494] border-[1px] rounded-[3px] font-extralight"
                  required
                  autoComplete="false"
                />
              </label>

              <label>
              <Text as="div" size="2" mb="1" weight="bold">
                  Image URL
                </Text>
                <TextField.Root
                  type="text"
                  id="image"
                  name="image"
                  className="px-[7px] py-[3px] mb-2 border-[#949494] border-[1px] rounded-[3px] font-extralight"
                  required
                  autoComplete="true"
                />
                </label>
                <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Banner Product Slug Link
                </Text>
                <TextField.Root
                  type="text"
                  id="link"
                  name="link"
                  className="px-[7px] py-[3px] mb-2 border-[#949494] border-[1px] rounded-[3px] font-extralight"
                  required
                  autoComplete="true"
                />
              </label>

              <Flex gap="3" mt="4" justify="end">
                <Button variant="classic" size="3" type="submit">
                  <FaSave /> Save
                </Button>
              </Flex>
            </form>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
