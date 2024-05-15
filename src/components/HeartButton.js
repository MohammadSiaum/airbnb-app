'use client';

import React from 'react';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import useFavorite from '../hooks/useFavorite';


const HeartButton = ({
    listingId,
    currentUser
}) => {
    const { toggleFavorite, hasFavorited } = useFavorite({listingId, currentUser});

    return (
        <div
          onClick={toggleFavorite}
          className='
             relative
             hover:opacity-80
             transition
             cursor-pointer
          '
        >
            <IoIosHeartEmpty
               size={28}
               className='
                 fill-white
                 absolute
                 -top-[2px]
                 -right-[2px]        
               '
            />


            <IoIosHeart 
               size={24}
               className={
                hasFavorited ? 'fill-rose-500'
                : 'fill-neutral-500/50'
               }
            />

        </div>
    );
};

export default HeartButton;