import { Text } from '@radix-ui/themes';
import Image from 'next/image';
import React from 'react';

function whyshop() {
    return (
        <>
            <section className="max-w-screen-2xl w-full mx-auto my-20 h-full text-center"
             id="why" aria-label="whyshopping">
                <Text size="8" mb="3" className="ml-10">
                    Why Shop with Glowing?
                </Text>
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 mt-10">
                    <div className="flex flex-col items-center w-full">
                        <div className="w-[350px] h-full mx-auto text-center">
                            <Image src="/feature-1.jpg" width={100} height={100} alt="Guaranteed PURE"
                                className='mx-auto'
                            />
                            <div className='mt-10'>
                                <Text size="7" >Guaranteed PURE</Text><br /><br />
                                <Text size="4" > All Grace formulations adhere to strict purity
                                    standards and will never contain harsh or toxic
                                    ingredients</Text>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center w-full">
                        <div className="w-[350px] h-full mx-auto text-center">
                            <Image src="/feature-2.jpg" width={100} height={100} alt="Guaranteed PUR"
                                className='mx-auto'
                            />
                            <div className='mt-10'>
                                <Text size="7" >Completely Cruelty-Free</Text><br /><br />
                                <Text size="4" > All Grace formulations adhere to strict purity
                                    standards and will never contain harsh or toxic
                                    ingredients</Text>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center w-full">
                        <div className="w-[350px] h-full mx-auto text-center">
                            <Image src="/feature-3.jpg" width={100} height={100} alt="Guaranteed PURED"
                                className='mx-auto'
                            />
                            <div className='mt-10'>
                                <Text size="7" >Ingredient Sourcing</Text><br /><br />
                                <Text size="4">All Grace formulations adhere to strict purity
                                    standards and will never contain harsh or toxic
                                    ingredients</Text>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default whyshop;
