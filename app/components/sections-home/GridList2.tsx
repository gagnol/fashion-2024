"use client"

import React from "react"
import Card from "./Card"
import { InView } from "react-intersection-observer"
import { Heading } from "@radix-ui/themes"
 
function RecommendedProducts({products}:any) {
    return (
        <InView as="div" onChange={(inView, entry) => console.log('Inview0:', inView)}>
        <div className="my-6 w-full mx-auto">
            <Heading size="6" className="mb-4 text-xl font-medium text-center">Recommended Products for Women&apos;s</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-2 xl:gap-4  mx-24">
                {products.map((product:any) => (
                  <Card  key={product.slug} product={product}/> 
                )).slice(0, 10)}
            </div>
        </div>
        </InView>
    )
}

export default RecommendedProducts
