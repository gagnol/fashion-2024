"use client"
import { Text } from '@radix-ui/themes';
import React, { ReactNode, useEffect, useState } from 'react';
import { BeatLoader } from "react-spinners";

interface LoadingProps {
    children: ReactNode;
  }

const Loading: React.FC<LoadingProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    }, 3000);
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-4 md:py-4">
      {isLoading ? (
        <div className="w-full flex flex-col gap-6 items-center justify-center py-20">
          <Text size="6" >Loading product...</Text>
          <BeatLoader color="#6c79b0" size={40} />
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default Loading;
