import { Badge } from '@radix-ui/themes';
import React from 'react';

// Define the props type
interface DescriptionListProps {
  description: string;
}

const DescriptionList: React.FC<DescriptionListProps> = ({ description }) => {
  // Split the text by "."
  const sentences = description.split('.').filter(sentence => sentence.trim() !== '');

  return (
    <ul>
      {sentences.map((sentence, index) => (
        <li key={index} className='flex my-2 '>✔️{sentence.trim()}.</li>
      ))}
    </ul>
  );
};

export default DescriptionList;