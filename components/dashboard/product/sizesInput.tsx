"use client"
import { Button } from '@radix-ui/themes';
import { useState } from 'react';
import { FaPlus, FaX } from 'react-icons/fa6';

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
            <FaX />
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
        <FaPlus/>
        Add Size
      </Button>
      <input type="hidden" name="sizes" value={JSON.stringify(sizes)} />
    </div>
  );
};

export default SizesInput;
