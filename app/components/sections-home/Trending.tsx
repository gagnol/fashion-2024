"use client"
import React from "react"
import { TRENDING_CATEGORIES } from "@/constant/products"
import Link from "next/link"
import { Box, Button, Card, Heading, Inset, Strong, Text } from "@radix-ui/themes"
import Image from "next/image"
import { InView } from "react-intersection-observer"

function TrendingCategories() {
    return (
        <InView as="div" onChange={(inView, entry) => inView}>
            <div className="max-w-screen-lg my-6 w-full mx-auto text-center">
                <Heading size="6" className="my-4 text-xl font-medium text-center">
                    Trending Categories
                </Heading>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {TRENDING_CATEGORIES.map((category: any) => (
                        <div key={category.id} className="relative flex justify-center group 
                        rounded-lg overflow-hidden h-full ">
                            <Box maxWidth="240px">
                                <Card size="2">
                                    <Inset clip="padding-box" side="top" pb="current">
                      <Image
                      width={200}
                      height={200}
                      src={category.image}
                      alt={category.name} 
                      className=" aspect-video group-hover:scale-105 
                      transition-transform opacity-55"
                      style={{
                      display: 'block',
                      objectFit: 'cover',
                      width: '100%',
                      height: 140,
                      backgroundColor: 'var(--gray-5)',
                         }}                                        
                     />
                     </Inset>
                        <Text as="p" size="3">
                            <Strong>Typography</Strong> is the art and technique of arranging type to
                                  make written language legible, readable and appealing when displayed.
                                </Text>
                                  <div className="flex w-full justify-center">
                                   <Button variant="classic" size="2" mt="2" asChild>
                                    <Link href={category.link}>
                                    Shop Now
                                    </Link>
                                    </Button>
                                   </div>
                                </Card>
                            </Box>

                            <div className="absolute inset-0 flex flex-col text-center p-6 my-10">
                                <h3 className="text-3xl font-bold ">{category.name}</h3>
                            </div>
                            </div>
           ))}
                    </div>
        </div>
        </InView>
    )
}

export default TrendingCategories
