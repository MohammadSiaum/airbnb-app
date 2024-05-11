'use client';

import React, { useCallback } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { toast } from 'react-toastify';

const Counter = ({
    title,
    subtitle,
    value,
    onChange

}) => {
    const onAdd = useCallback(() => {
        if(value === 7) {
            toast.warning("At most seven Guests, Rooms and Bathrooms and less");
            return;
        }
        onChange(value + 1);

    }, [value, onChange])

    const onReduce = useCallback(() => {
        if (value === 1) {
            toast.warning("At least one Guest, Room and Bathrooms and more");
            return;
        }
        onChange(value - 1);

    }, [value, onChange])
    return (
        <div
           className='flex flex-row items-center justify-between'
        >
            <div className='flex flex-col text-neutral-700'>
                <div className='font-semibold text-lg'>
                    {title}
                </div>
                <div className='font-semibold text-gray-600'>
                    {subtitle}
                </div>
            </div>
            <div className='flex flex-row items-center gap-7'>
                <div
                  onClick={onReduce}
                  className='
                      w-8
                      h-8
                      rounded-full
                      border-2
                      border-rose-500
                      bg-rose-100
                      flex
                      items-center
                      justify-center
                      text-rose-700
                      cursor-pointer
                      hover:opacity-80
                      transition                  
                    '
                >
                    <AiOutlineMinus size={20} />

                </div>
                <div className='font-semibold text-xl text-neutral-600'>
                    {value}
                </div>
                <div
                  onClick={onAdd}
                  className='
                      w-8
                      h-8
                      rounded-full
                      border-2
                      border-violet-500
                      flex
                      items-center
                      justify-center
                      text-violet-600
                      bg-violet-100
                      cursor-pointer
                      hover:opacity-80
                      transition                  
                    '
                >
                    <AiOutlinePlus size={20} />

                </div>
            </div>
        </div>
    );
};

export default Counter;