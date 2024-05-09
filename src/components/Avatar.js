import Image from 'next/image';
import React from 'react';
import avatar from '/public/images/avatar.jpg';

const Avatar = ({src}) => {
    return (
        <Image 
           className='rounded-full'
           height={"35"}
           width={"35"}
           alt='Avatar'
           src={src || avatar}
        />
    );
};

export default Avatar;