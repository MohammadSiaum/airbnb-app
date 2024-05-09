'use client';

import React from 'react';

const CategoryInput = ({
    icon: Icon,
    label,
    selected,
    onClick

}) => {
    return (
        <div
          onClick={() => onClick(label)}
          className={`
              rounded-md
              border-2
              p-4
              flex
              flex-col
              gap-3
              hover:text-neutral-700
              hover:border-rose-400
              transition
              cursor-pointer
              ${selected ? 'border-rose-400' : 'border-neutral-300'}
              ${selected ? 'text-neutral-700' : 'text-neutral-500'}

          `}
        >
            <Icon size={20}/>
            <h3 className='font-semibold text-sm'>
                {label}
            </h3>

            
        </div>
    );
};

export default CategoryInput;