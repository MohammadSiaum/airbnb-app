'use client';

import React from 'react';
import useCountries from '../../hooks/useCountries';
import Heading from '../Heading';
import Image from 'next/image';
import HeartButton from '../HeartButton';

const ListingHead = ({
    id,
    title,
    imageSrc,
    locationValue,
    currentUser,

}) => {
    const { getByValue } = useCountries();
    const location = getByValue(locationValue);

    return (
        <>
            <Heading
              title={title}
              subtitle={`${location?.region}, ${location?.label}`}
            />
            <div
              className='
                 w-full
                 h-[60vh]
                 overflow-hidden
                 rounded-xl
                 relative
              '
            >
                <Image 
                  alt={title}
                  src={imageSrc}
                  fill
                  className='object-cover w-full'
                />
                <div className='absolute top-5 right-5'>
                    <HeartButton 
                       listingId={id}
                       currentUser={currentUser}
                    />
                </div>
            </div>
        </>
    );
};

export default ListingHead;