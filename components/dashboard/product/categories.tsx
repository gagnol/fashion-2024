'use client';

import { Button, DropdownMenu } from '@radix-ui/themes';
import useSWR from 'swr';
import { useState } from 'react';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

interface CategoriesProps {
  onCategorySelect: (category: string | null) => void; // Prop for parent callback
}

const Categories: React.FC<CategoriesProps> = ({ onCategorySelect }) => {
  const { data, error } = useSWR('/api/products/categories', fetcher);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    onCategorySelect(category); // Pass the selected category to parent component
  };

  const clearSelection = () => {
    setSelectedCategory(null);
    onCategorySelect(null); // Reset to default "Categories"
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="soft" size="3" color="gray" >
          {selectedCategory ? selectedCategory : "Categories"}
          <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {/* Option to clear selection */}
        <DropdownMenu.Item onSelect={clearSelection}>
          Clear Selection
        </DropdownMenu.Item>
        
        {/* Render category options */}
        {data
          ? data.categories.map((item: any) => (
              <DropdownMenu.Item
                key={item}
                onSelect={() => handleCategorySelect(item)} // Handle selection
              >
                {item}
              </DropdownMenu.Item>
            ))
          : null}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Categories;
