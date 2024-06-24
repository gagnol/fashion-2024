"use client"
import { CrossCircledIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { Button, TextField } from '@radix-ui/themes';
import { useState, useEffect } from 'react';

const SizesInput = ({ initialSizes }:any) => {
  const [sizes, setSizes] = useState(initialSizes || ['']);

  const handleSizeChange = (index:number, event:any) => {
    const newSizes = [...sizes];
    newSizes[index] = event.target.value;
    setSizes(newSizes);
  };

  const handleAddSize = () => {
    setSizes([...sizes, '']);
  };

  const handleRemoveSize = (index:number) => {
    const newSizes = sizes.filter((_:string, i:number) => i !== index);
    setSizes(newSizes);
  };

  return (
    <div className="sizes-input">
      <label>Sizes</label>
      {sizes.map((size:string, index:number) => (
        <div key={index} className="size-input flex items-center">
          <input
            className='a_input_sm'
            type="text"
            value={size}
            onChange={(event) => handleSizeChange(index, event)}
          />
          <Button
            variant='ghost'
            size="1"
            color='ruby'
            type="button"
            onClick={() => handleRemoveSize(index)}
          >
            <CrossCircledIcon />
            Remove
          </Button>
        </div>
      ))}
      <Button
        variant='ghost'
        size="1"
        color='indigo'
        type="button"
        onClick={handleAddSize}
      >
        <PlusCircledIcon />
        Add Size
      </Button>
      <input type="hidden" name="sizes" value={JSON.stringify(sizes)} />
    </div>
  );
};

export default SizesInput;
