'use client';

import React from 'react';

const ListingCategory = ({
    icon:Icon, 
    label, 
    description

}) => {
    return (
        <div className='flex flex-col gap-6'>
            <div className='flex flex-row items-center gap-4'>
                <Icon size={48} className="text-neutral-600" />
                <div className='flex flex-col'>
                    <h3 className='text-lg font-semibold'>
                        {label}
                    </h3>
                    <h4 className='text-neutral-600 font-medium'>
                        {description}
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default ListingCategory;