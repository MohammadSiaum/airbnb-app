"use client";

import React, { useEffect, useState } from "react";
import { Oval, TailSpin } from "react-loader-spinner";
import { BarLoader, FadeLoader } from "react-spinners";

const ClientOnly = ({ children, label }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

  }, []);
  // console.log(label);

  if (!hasMounted) {

    if(label === 'Navber') {
      return (
        <div className="flex items-center justify-center mt-24">
          <BarLoader  color="#f33a6a" />
        </div>
      )
    }

    return (
      <div className="flex items-center justify-center mt-52">       
        <FadeLoader color="#f33a6a" /> 
      </div>
    );
  }

  return <>{children}</>;
};

export default ClientOnly;
