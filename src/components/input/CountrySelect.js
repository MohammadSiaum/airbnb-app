'use client';

import React from 'react';
import Select from 'react-select';
import useCountries from '../../hooks/useCountries'

const CountrySelect = ({
    value,
    onChange,

}) => {
    const { getAll } = useCountries();
    return (
        <div className='text-neutral-700 font-semibold'>
            <Select 
               placeholder='Anywhere'
               isClearable
               options={getAll()}
               value={value}
               onChange={(value) => onChange(value)}
               formatOptionLabel={(option) => (
                  <div className='flex flex-row items-center gap-3'>
                     <div>
                        {option.flag}
                     </div>
                     <div>
                        {option.label},
                        <span className='text-neutral-500 ml-1'>
                            {option.region}
                        </span>
                     </div>
                  </div>
               )}
               classNames={{
                 control: () => 'p-2',
                 input: () => 'text-lg',
                 option: () => 'text-lg',

               }}
               theme={(theme) => ({
                  ...theme,
                  borderRadius: 6,
                  borerColor: '',
                  colors: {
                    ...theme.colors,
                    primary: '#ff6670',
                    primary25: '#ffe4e6',
                    primary50: '#ff99a0'
                  }
               })}
            />
        </div>
    );
};

export default CountrySelect;