import React from 'react';
import Calendar from '../input/Calendar';
import Button from '../Button';


const ListingReservation = ({
    price,
    dateRange,
    totalPrice,
    onChangeDate,
    onSubmit,
    disabled,
    disabledDates

}) => {
    return (
        <div className='
                bg-gray-50
                rounded-xl
                border
                border-neutral-300
                overflow-hidden

             '
        >
            <div className='
                    flex
                    flex-row
                    items-center
                    gap-1
                    p-4
                 '
            >
                <h1 className='
                       text-2xl 
                       font-semibold 
                       text-neutral-700
                    '
                >
                    $ {price}
                </h1>
                <h4 className='
                       font-semibold 
                       text-neutral-500
                       ml-1
                    '
                >night</h4>
            </div>
            <hr />
            <Calendar 
               value={dateRange}
               disabledDates={disabledDates}
               onChange={(value) => onChangeDate(value.selection)}
            />
            <hr />

            <div className='p-4'>
                <Button 
                   disabled={disabled}
                   label={'Reserve'}
                   onClick={onSubmit}
                />
            </div>

            <div className='
                    p-4
                    flex
                    flex-row
                    items-center
                    justify-between
                    font-semibold
                    text-lg
                    text-neutral-700        
                 '
            >
                <h3>Total</h3>
                <h3>$ {totalPrice}</h3>

            </div>
            
        </div>
    );
};

export default ListingReservation;