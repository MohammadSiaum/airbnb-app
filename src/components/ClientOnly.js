"use client";

import React, { useEffect, useState } from "react";
import { Oval, TailSpin } from "react-loader-spinner";
import { BarLoader } from "react-spinners";

const ClientOnly = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

  }, []);

  if (!hasMounted) {
    return (
      <div className="flex items-center justify-center mt-24">
        {/* <Oval
          visible={true}
          height="50"
          width="50"
          color="#4fa94d"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        /> */}
        <BarLoader  color="#ff99a0" />
        
      </div>
    );
  }

  return <>{children}</>;
};

export default ClientOnly;
