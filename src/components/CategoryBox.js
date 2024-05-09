'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';
import qs from 'query-string';

const CategoryBox = ({
    label, 
    description, 
    icon: Icon, 
    selected

}) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        let currentQuery = {};

        if(params) {
            currentQuery = qs.parse(params.toString());
        }
        const updatedQuery = {
            ...currentQuery,
            category: label,
        };
        // console.log(updatedQuery)

        if(params?.get('category') === label) {
            const del = delete updatedQuery.category;
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery,
        }, { skipNull: true});
        
        router.push(url);
    }, [params, label, router])


    return (
        <div
          onClick={handleClick}
          className={`
             flex
             flex-col
             items-center
             justify-center
             gap-2
             py-3
             border-b-2
             hover:text-neutral-800
             hover:border-neutral-600
             transition
             cursor-pointer
             ${selected ? 'border-b-neutral-800' : 'border-transparent'}
             ${selected ? 'text-neutral-800' : 'text-neutral-500'}

          `}
        >
            <Icon size={26} />
            <div className='font-semibold text-sm'>
                {label}
            </div>
        </div>
    );
};

export default CategoryBox;