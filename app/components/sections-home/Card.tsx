
import React from 'react'
import { Box, Button, Card, DropdownMenu, Flex, Inset, Separator, Strong, Text } from "@radix-ui/themes"
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Image from 'next/image';
import Link from 'next/link';

const Cardgrid = ({ product }: any) => {
    return (
        <Box maxWidth="240px" key={product.slug} >
            <Card size="2" className="border-gray-300 ">
                <Inset clip="padding-box" side="top" pb="current">
                    <Link href={`/products/${product.slug}`} >
                        <div className="relative w-full">
                            {product.discount > 0 ? (
                                <>
                                    <Image
                                        src="/corner3.png"
                                        alt="Bold typography"
                                        className=" absolute left-0 top-0 max-h-[85px] min-h-[85px] max-w-[75px] min-w-[75px]"
                                        width={50} height={50}
                                    />
                                </>
                            ) :
                                (<></>)}


                            <Image
                                src={product.image[0]}
                                alt="Bold typography"
                                className="image max-h-[240px] min-h-[240px] max-w-[240px] min-w-[240px]"
                                width={240} height={240}
                            />
                            <Image
                                src={product.image[1]}
                                alt="Bold typography"
                                className="image absolute top-0 left-0 opacity-0 hover:opacity-100
                transition-opacity duration-300 cursor-pointer max-h-[240px] min-h-[240px]
                max-w-[240px] min-w-[240px]"
                                width={240} height={240}
                            />
                        </div>
                    </Link>
                </Inset>
                <Text as="p" size="4">
                    <Strong><span className="text-[14px] align-top">$</span>{product.price}</Strong>
                </Text>
                <Separator orientation="horizontal" size="4" color='indigo' className="my-2 text-slate-600 w-full" />
                <Text as="p" size="1" className="mb-2">
                    {product.name.substring(21, 50)}
                </Text>
                <Flex className="justify-between" >
                    <Flex gap="3" align="center">
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                <Button color="gray" variant="surface" size="2">
                                    Sizes
                                    <DropdownMenu.TriggerIcon />
                                </Button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content size="2">
                                {product.sizes?.map((item: string) => (
                                    <DropdownMenu.Item shortcut="⌘" key={item}>
                                        {item}
                                    </DropdownMenu.Item>
                                ))}
                            </DropdownMenu.Content>

                        </DropdownMenu.Root>
                    </Flex>
                    <Button variant="surface" mx="2" asChild>
                        <Link href={`/products/${product.slug}`} >
                            <AiOutlineShoppingCart />
                            Order Now
                        </Link>
                    </Button>
                </Flex>
            </Card>
        </Box>

    );
};

export default Cardgrid