'use client';

import React from 'react';

const Heading = ({
    title,
    subtitle,
    center
}) => {
    return (
        <div className={center ? 'text-center' : 'text-start'}>
            <div className='text-2xl font-bold'>
                {title}
            </div>
            <div className=' text-neutral-600 text-lg mt-2 font-semibold'>
                {subtitle}
            </div>
        </div>
    );
};

export default Heading;