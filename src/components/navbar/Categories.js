'use client';

import React from 'react';
import Container from '../Container';

import { TbBeach, TbMountain } from 'react-icons/tb'
import { GiWindmill, GiMountainCave, GiTropicalFish, GiIsland, GiBoatFishing, GiCastle, GiForestCamp, GiDesert, GiCaveEntrance, GiBarn } from 'react-icons/gi';
import { MdOutlineVilla, MdPool, MdBedroomParent } from 'react-icons/md';
import { IoBoat, IoDiamond } from "react-icons/io5";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";


import CategoryBox from "../CategoryBox"
import { usePathname, useSearchParams } from 'next/navigation';




export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to the beach.'
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This property has windmills.'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This property is modern.'
    },
    {
        label: 'Boats',
        icon: IoBoat,
        description: 'This property has many boats.'
    },
    {
        label: 'Caves',
        icon: GiCaveEntrance,
        description: 'This property is in the caves.'
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'This property is close to a lake.'
    },
    {
        label: 'Tropical',
        icon: GiTropicalFish,
        description: 'This property has tropical fish.'
    },
    {
        label: 'Rooms',
        icon: MdBedroomParent,
        description: 'This property has many rooms.'
    },
    {
        label: 'Island',
        icon: GiIsland,
        description: 'This property is on island.'
    },
    {
        label: 'Pools',
        icon: MdPool,
        description: 'This property has amazing pools that makes beautiful seen.'
    },
    {
        label: 'Countryside',
        icon: TbMountain,
        description: 'This property is in the countryside.'
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'This property has skiing activities.'
    },
    {
        label: 'Castle',
        icon: GiCastle,
        description: 'This property is in a castle.'
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'This property has camping activities.'
    },
    {
        label: 'Arctic',
        icon: BsSnow,
        description: 'This property has camping activities.'
    },
    {
        label: 'Desert',
        icon: GiDesert,
        description: 'This property is in a the desert.'
    },
    {
        label: 'Barns',
        icon: GiBarn,
        description: 'This property is in a the desert.'
    },
    {
        label: 'Luxurious',
        icon: IoDiamond,
        description: 'This property is in a the desert.'
    },
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    
    const isMainPage = pathname === '/';
    
    if(!isMainPage) {
        return null;
    }


    return (
        <Container>
            <div
               className='
                  pt-4
                  pb-2
                  gap-3
                  flex
                  flex-row
                  items-center
                  justify-between
                  overflow-x-auto
               '
            >
                {categories.map(item => (
                    <CategoryBox
                       key={item.label}
                       label={item.label}
                       selected={category === item.label}
                       description={item.description}
                       icon={item.icon}
                    />

                ))}

            </div>
        </Container>
    );
};

export default Categories;