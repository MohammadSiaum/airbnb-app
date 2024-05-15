import React from 'react';
import getListingById from '../../../actions/getListingById';
import ClientOnly from '../../../components/ClientOnly';
import EmptyState from '../../../components/EmptyState';
import { getCurrentUser } from '../../../actions/getCurrentUser';
import ListingClient from "./ListingClient"

const ListingPage = async ({params}) => {
    const listing = await getListingById(params);
    const currentUser = await getCurrentUser();
    // console.log(listing);

    if (!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <ListingClient 
               listing={listing}
               currentUser={currentUser}
            />
        </ClientOnly>
    );
};

export default ListingPage;