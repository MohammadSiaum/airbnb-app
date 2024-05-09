import React from 'react';

const MenuItem = ({label, onClick, className}) => {
    return (
        <div
          onClick={onClick}
          className='
              px-7
              py-3
              hover:bg-rose-100
              transition
              font-semibold 
              text-gray-600
          '
        >
            <h3 className={className}>
              {label}
            </h3>
            
        </div>
    );
};

export default MenuItem;