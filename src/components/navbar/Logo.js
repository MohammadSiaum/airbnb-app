'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import logo from '/public/images/Airbnb_Logo.png';

const Logo = () => {
    const router = useRouter();
    return (
        <Image
           onClick={() => router.push('/')} 
           alt='Logo'
           className='hidden md:block cursor-pointer'
           height={'100'}
           width={'100'}
           src={logo}
        />
    );
};

export default Logo;