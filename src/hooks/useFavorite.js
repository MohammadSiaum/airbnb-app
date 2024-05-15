import React, { useCallback, useMemo } from 'react';
import useLoginModal from './useLoginModal';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';


const useFavorite = ({
    listingId,
    currentUser
}) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(listingId);

    }, [currentUser, listingId]);

    const toggleFavorite = useCallback(async(ev) => {
        ev.stopPropagation();

        if(!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;
            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`);

                await request();
                router.refresh();
                toast.error('Removed to favorite lists');
            }

            else {
                request = () => axios.post(`/api/favorites/${listingId}`);

                await request();
                router.refresh();
                toast.success('Added to favorite lists');
            }

            
        }

        catch (error) {
            toast.error('Something went wrong!')
        }

    }, [currentUser, hasFavorited, listingId, loginModal, router]);

    return {
        hasFavorited,
        toggleFavorite
    }

};

export default useFavorite;