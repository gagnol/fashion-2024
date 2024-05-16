"use client"
import * as Popover from '@radix-ui/react-popover';
import { Separator, Text } from '@radix-ui/themes'
import React from 'react'
import { FaCaretDown } from 'react-icons/fa'
import FormattedPrice from '../FormattedPrice';

const CountryTaxes = ({ discountPrice,product }: any) => {
   
    const totalPrice = (discountPrice + product.shipping )

    return (
        <> 
              <Popover.Root>
                        <Popover.Trigger >
                <Text size="2" color='gray' className=" my-2 flex ">
                    $ {product.shipping} Shipping
                </Text>
                <Text   size="2" color='indigo' className="flex py-3 text-primary ">
                    Details 
                    <FaCaretDown className=' text-[14px] pt-2' />
                </Text>                
                </Popover.Trigger>
                <Popover.Portal >
                        <Popover.Content >
                    <div className='p-2 bg-[#141726] w-60 h-60'>
                        <ul className='m-0 p-0 '>
                            <h4 className='text-[18px] font-bold p-2 border-b text-white'>
                                Total Price 
                            </h4>
                            <li className="nav_text">Price
                             <span className='float-right'>
                                <FormattedPrice discountPrice={discountPrice}/>
                            </span>
                                </li>
                            <li className="nav_text">Shipping
                                <span className='float-right'>${product.shipping}</span></li>
                                <Separator size="4" color='jade' />
                            <h4 className='font-bold text-[14px] pt-2 text-neutral-200'>Total
                                <span className='float-right'>
                                <FormattedPrice discountPrice={totalPrice}/>
                                </span>
                            </h4>
                        </ul>
                    </div>
                </Popover.Content>
                </Popover.Portal>
              
            </Popover.Root>
            
        </>
    )
}

export default CountryTaxes
