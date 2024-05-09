"use client";

import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "../../hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import useRentModal from "../../hooks/useRentModal";

const UserMenu = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(()=> {
    if(!currentUser) {
      return loginModal.onOpen();
    } 
    // Open Rent Modal
    rentModal.onOpen();

  }, [currentUser, loginModal, rentModal])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="
                hidden
                md:block
                text-md
                font-semibold
                py-3
                px-4
                rounded-full
                 hover:bg-neutral-100
                transition
                cursor-pointer
                text-neutral-700 
            "
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="
                p-4
                md:py-2
                md:px-3
                border
                border-neutral-200
                flex
                flex-row
                items-center
                gap-2
                rounded-full
                cursor-pointer
                hover:shadow-md
                transition
            "
        >
          <AiOutlineMenu size={18} />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
              absolute
              rounded-md
              shadow-md
              w-[40vw]
              md:w-full
              bg-white
              overflow-hidden
              right-0
              top-16
              text-md
              border
              border-rose-200
           "
        >
          <div className="flex flex-col cursor-pointer py-3">
            {currentUser?.email ? (
            
            <> 
              <MenuItem onClick={() => {}} label={"My trips"} />
              <MenuItem onClick={() => {}} label={"My favorites"} />
              <MenuItem onClick={() => {}} label={"My reservations"} />
              <MenuItem onClick={() => {}} label={"My properties"} />
              <MenuItem onClick={rentModal.onOpen} label={"Airbnb my home"} />
              <hr />
              <MenuItem 
                 className="font-bold text-gray-700" 
                 onClick={()=>signOut()} 
                 label={"Log Out"} 

              />

            </>  
            ) : (
       
            <>
              <MenuItem 
                  className="font-bold text-gray-700"
                  onClick={loginModal.onOpen} 
                  label={"Login"} />
              <MenuItem onClick={registerModal.onOpen} label={"Register"} />
              <hr />
              <MenuItem onClick={() => {}} label={"Gift Cards"} />
              <MenuItem onClick={onRent} label={"Airbnb my home"} />
              <MenuItem onClick={() => {}} label={"Help Center"} />
            </>
            )}

            
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
