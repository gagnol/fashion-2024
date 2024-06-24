"use client"

import React from "react"
import Card from "./Card"
import { InView } from "react-intersection-observer"
import { Heading } from "@radix-ui/themes"
 
function RecommendedProducts({products}:any) {
    return (
        <InView as="div" onChange={(inView, entry) => inView}>
        <div className="my-6 w-full mx-auto">
            <Heading size="6" className="mb-4 text-xl font-medium text-center">Recommended Products for Women&apos;s</Heading>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product:any) => (
                       <div key={product.slug} className="flex justify-center">
                  <Card  product={product}/> 
                  </div>
                )).slice(0, 12)}
            </div>
        </div>
        </InView>
    )
}

export default RecommendedProducts
