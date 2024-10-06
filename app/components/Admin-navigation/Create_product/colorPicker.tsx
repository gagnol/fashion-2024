import { CrossCircledIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import React, { useState } from 'react';

const ColorsInput = ({ onColorsChange }:
   { onColorsChange: (colors: {name: string, color: string}[]) => void }) => {
 
     const [colors, setColors] = useState<{name: string, color: string}[]>([]);

  const addColor = () => {
    setColors([...colors, {name: '', color: ''}]);
  }

  const updateColor = (index: number, field: string, value: string) => {
    const newColors = [...colors];
    newColors[index] = { ...newColors[index], [field]: value };
    setColors(newColors);
    onColorsChange(newColors);
  }

  const removeColor = (index: number) => {
    const newColors = colors.filter((_, i) => i !== index);
    setColors(newColors);
    onColorsChange(newColors);
  }

  return (
    <div>
      <label>Colors</label>
      {colors.map((color, index) => (
          <div key={index}>
          <input
            type="text"
            placeholder="Name"
            value={color.name}
            onChange={(e) => updateColor(index, 'name', e.target.value)}
          />
          <input
            type="color"
            value={color.color}
            onChange={(e) => updateColor(index, 'color', e.target.value)}
          />
            <Button variant='ghost' size="1" color='ruby' type="button" onClick={() => removeColor(index)}>
            <CrossCircledIcon /> Remove
            </Button>
        </div>
      ))}
      <Button variant='ghost' size="1" color='indigo' my="2" onClick={addColor}>
      <PlusCircledIcon/>Add Color
      </Button>
    </div>
  );
}

export default ColorsInput;
