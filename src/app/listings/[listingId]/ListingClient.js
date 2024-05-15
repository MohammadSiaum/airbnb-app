'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';

import Container from '../../../components/Container';
import { categories } from '../../../components/navbar/Categories';
import ListingHead from '../../../components/listings/ListingHead';
import ListingInfo from '../../../components/listings/ListingInfo';
import ListingReservation from '../../../components/listings/ListingReservation';
import useLoginModal from '../../../hooks/useLoginModal';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

const ListingClient = ({
    listing,
    currentUser,
    reservations = []

}) => {
    const loginModal = useLoginModal();
    const router = useRouter();

    const disabledDates = useMemo(() => {
        let dates = [];

        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });

            dates = [...dates, ...range];
        });

        return dates;

    }, [reservations]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState(initialDateRange);

    const onCreateReservation = useCallback( async() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        setIsLoading(true);
        
        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        })
          .then(() => {
            toast.success('Listing reserved');
            setDateRange(initialDateRange);
            // Redirect to trips
            router.refresh();
          })
          .catch(() => {
            toast.error('Something went wrong.');
          })
          .finally(() => {
            setIsLoading(false);
          })

    }, [
        currentUser, 
        loginModal, 
        dateRange, 
        totalPrice, 
        listing?.id,
        router
    ]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if (dayCount) {
                setTotalPrice(dayCount * listing.price);

            }
            else {
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price]);


    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category);

    }, [listing.category]);

    return (
        <Container>
            <div className='max-w-screen-lg mx-auto'>
                <div className='flex flex-col gap-6'>
                    <ListingHead 
                       id={listing.id}
                       title={listing.title}
                       imageSrc={listing.imageSrc}
                       locationValue={listing.locationValue}
                       currentUser={currentUser}
                    />
                </div>
                <div className='
                   grid
                   grid-cols-1
                   md:grid-cols-7
                   md:gap-10
                   mt-8
                '>
                    <ListingInfo 
                       user={listing.user}
                       category={category}
                       description={listing.description}
                       roomCount={listing.roomCount}
                       guestCount={listing.guestCount}
                       bathroomCount={listing.bathroomCount}
                       locationValue={listing.locationValue}
                    />
                    <div
                      className='
                         order-first
                         mb-10
                         md:order-last
                         md:col-span-3
                     '
                    >
                        <ListingReservation 
                           price={listing.price}
                           totalPrice={totalPrice}
                           onChangeDate={(value) => setDateRange(value)}
                           dateRange={dateRange}
                           onSubmit={onCreateReservation}
                           disabled={isLoading}
                           disabledDates={disabledDates}
                        />
                   </div>

                </div>
                
            </div>
        </Container>
    );
};

export default ListingClient;