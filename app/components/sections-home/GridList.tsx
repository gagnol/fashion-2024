"use client"
import React from 'react';
import { InView } from 'react-intersection-observer';
import Card from './Card'; // Import your Card component
import { Heading } from '@radix-ui/themes';

const GridList = ({ products }:any) => {
    return (
        <InView as="div" onChange={(inView, entry) => inView}>
            <div className="my-6 w-full mx-auto text-center">
                <Heading size="6" className="mb-4 text-xl font-medium">Recommended Products for Men&apos;s</Heading>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-5 xl:gap-4 mx-24">
                    {products.slice(0, 10).map((product:any) => (
                        <Card key={product.slug} product={product} />
                    ))}
                </div>
            </div>
        </InView>
    );
};

export default GridList;
