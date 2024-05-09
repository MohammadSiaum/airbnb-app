import React from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (
    <div
      className="
               border
               w-full
               md:w-auto
               py-2
               rounded-full
               shadow-sm
               hover:shadow-md
               transition
               cursor-pointer
               text-neutral-700                
               "
    >
      <div
        className="
                flex
                flex-row
                items-center
                justify-between
             "
      
      >
        <div
          className="
                  text-md
                  font-semibold
                  px-6
               "
        >
          Anywhere
        </div>
        <div
          className="
                 hidden
                 sm:block
                 text-md
                 font-semibold
                 px-6
                 border-x
                 flex-1
                 text-center
               "
        >
          Any week
        </div>
        <div
          className="
                 text-md
                 font-semibold
                 text-gray-600
                 pr-2
                 pl-6
                 px-6
                 flex
                 flex-row
                 items-center
                 gap-3
                 text-center
               "
        >
          <div className="hidden sm:block">Add Guests</div>
          <div
           className="
             p-2
             bg-rose-500
             rounded-full
             text-white
           "
        >
           <BiSearch size={16}/>
        </div>
        </div>
        
        
      </div>
    </div>
  );
};

export default Search;
