import React from 'react';
import useCountries from '../../hooks/useCountries';
import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../Map'), {
    ssr: false
});

const ListingInfo = ({
    user,
    category,
    description,
    roomCount,
    guestCount,
    bathroomCount,
    locationValue

}) => {
    const { getByValue } = useCountries();
    const coordinates = getByValue(locationValue)?.latlng;

    return (
        <div className='col-span-4 flex flex-col gap-8'>
            <div className='flex flex-col gap-2'>
                <div
                  className='
                     text-xl
                     font-semibold
                     flex
                     fex-row
                     items-center
                     gap-2
                  '
                >
                    <h3>Hosted by {user?.name}</h3>
                    <Avatar src={user?.image} />
                </div>
                <div
                   className='
                      flex
                      flex-row
                      items-center
                      gap-4
                      font-semibold
                      text-neutral-500
                   '
                >
                    <h4>{guestCount} guests</h4>
                    <h4>{roomCount} rooms</h4>
                    <h4>{bathroomCount} bathrooms</h4>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory 
                   icon={category.icon}
                   label={category.label}
                   description={category.description}
                />
            )}
            <hr />

            <div className='text-lg font-medium text-neutral-500'>
                {description}
            </div>
            <hr />
            <Map center={coordinates} />

        </div>
    );
};

export default ListingInfo;