'use client';
import React, { useState } from 'react';
import { Button, Flex, Strong, Text, TextField } from '@radix-ui/themes';
import SupplierNeeds from './bannersTable';
import BannerForm from './create-banner';

export default function BannersList({ products }: any) {
 
  return (
    <div>
      <div className="p-4 rounded-lg justify-start text-start w-full mx-auto">
         <Text size="5">
          <Strong>Edit Banners</Strong>
        </Text>
        <BannerForm />
       <SupplierNeeds products={products}/> 
      </div>
    </div>
  );
}
