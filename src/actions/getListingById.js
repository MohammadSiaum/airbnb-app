import prisma from "../libs/prismadb";

export default async function getListingById(params) {
    try {
        const { listingId } = params;

        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                user: true
            }
        });

        console.log(listing);

        if(!listing) {
            return null;
        }


        return listing;
    

        // return {
        //     ...listing,
        //     createdAt: listing.createdAt.toISOString(),
        //     user: {
        //         ...listing.user,
        //         createdAt: listing.createdAt.toISOString(),
        //         updatedAt: listing.updatedAt.toISOString(),
        //         emailVerified: listing.user.emailVerified?.toISOString() || null,
        //     },
        // };
    } catch (error) {
        
        throw new Error(error);
    }
}