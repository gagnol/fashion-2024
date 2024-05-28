"use client"
import { Button, DropdownMenu } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import useSWR from 'swr';

const fetcher = (url:any) => fetch(url).then((res) => res.json());
const All = () => {
// SUB-CATEGORIES 
const router = useRouter();
const onSelectChange = (e:any) => {
  const category = e.target.value;
  router.push(`/search?category=${category}`)
}
const { data, error } = useSWR('/api/products/categories', fetcher)



    return (
<DropdownMenu.Root >
  <DropdownMenu.Trigger >
    <Button variant="soft" size="3" onChange={onSelectChange}>
      Categories
      <DropdownMenu.TriggerIcon />
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content  >
            {data
                ? data.categories.map((item:any) => {
                    return <DropdownMenu.Item  shortcut="⌘" key={item}>{item}</DropdownMenu.Item>;
                })
                : null}
    </DropdownMenu.Content>
    </DropdownMenu.Root>

    )
}

export default All
