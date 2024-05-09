"use client";

import React from 'react';

const Button = ({
    label,
    onClick,
    disable,
    outline,
    small,
    icon: Icon
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disable}
            className={`
               relative
               disabled:opacity-70
               disabled:cursor-not-allowed
               rounded-md
               hover:opacity-80
               transition
               w-full
               border
               
               ${outline ? 'bg-gray-100 border-gray-400 text-black' : 'bg-rose-500 border-rose-600 text-white'}
               ${small ? 'py-1 text-sm font-light' : 'py-2 text-md font-semibold'}
            `}
        >
            {Icon && (
                <Icon 
                   size={24}
                   className='
                       absolute
                       left-20                   
                   '      
                />
            )}
            <span>{label}</span>
        </button>
    );
};

export default Button;