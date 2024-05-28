"use client"
import { CrossCircledIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { Button, TextField } from '@radix-ui/themes';
import { useState } from 'react';

const ImagesInput = () => {
  const [images, setImages] = useState(['']);

  const handleImageChange = (index:any, event:any) => {
    const newImages = [...images];
    newImages[index] = event.target.value;
    setImages(newImages);
  };

  const handleAddImage = () => {
    setImages([...images, '']);
  };

  const handleRemoveImage = (index:any) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  return (
    <div className="images-input">
      <label>Images</label>
      {images.map((image, index) => (
        <div key={index} className="flex flex-wrap">
          <input
            className='a_input_sm'
            type="text"
            value={image}
            onChange={(event) => handleImageChange(index, event)}
            required
          />
          <Button variant='ghost' size="1" color='ruby' type="button" onClick={() => handleRemoveImage
            (index)}>
          <CrossCircledIcon />
            Remove
          </Button>
        </div>
      ))}
      <Button variant='ghost' size="1" color='indigo' type="button" onClick={handleAddImage}>
      <PlusCircledIcon/>
        Add Image
      </Button>
      <input type="hidden" name="sizes" value={JSON.stringify(images)} />

    </div>
    
  );
};



export default ImagesInput;
