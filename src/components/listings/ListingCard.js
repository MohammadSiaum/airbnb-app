"use client";

import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import useCountries from "../../hooks/useCountries";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

const ListingCard = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId,
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);
  const handleCancel = useCallback(
    (ev) => {
      ev.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group border border-neutral-300 p-1 rounded-xl"
    >
      <div className="flex flex-col w-full">
        <div
          className="
                      aspect-square
                      w-full
                      relative
                      overflow-hidden
                      rounded-xl
                      mb-2
                   "
        >
          <Image
            fill
            alt="Listing"
            src={data.imageSrc}
            className="
                         object-cover
                         h-full
                         w-full
                         group-hover:scale-110
                         transition
                       "
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>

        <div className="flex flex-col gap-1 p-2">
          <div className="font-semibold text-lg">
            {location?.region}, {location?.label}
          </div>
          <div className="font-semibold text-sm text-neutral-500">
            {reservationDate || data.category}
          </div>
          <div
            className="
                        flex 
                        flex-row 
                        gap-2
                     "
          >
            <div className="font-semibold text-neutral-600">$ {price}</div>
            {!reservation && (
              <div className="font-semibold text-sm text-neutral-700">
                night
              </div>
            )}
          </div>
          {onAction && actionLabel && (
            <Button 
              disable={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
