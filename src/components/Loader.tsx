import Image from "next/image";
import React from "react";
import { Skeleton } from "./ui/skeleton";

const Loader = () => {
  return (
    <div>
      <>
        <div className="flex flex-col ">
          <div className="flex items-center">
            <Image
              className="text-left mb-4 mt-4 pr-4 "
              src={"/agai.png"}
              height={30}
              width={30}
              alt=""
            />
            <p className="text-fuchsia-500">Agai</p>
          </div>
          <Skeleton className="ml-8 h-4 w-[150px] md:w-[350px] rounded-xl bg-gray-800 mb-2" />
          <Skeleton className="ml-8 h-4 w-[150px] md:w-[350px] rounded-xl bg-gray-800 mb-2" />
        </div>
      </>
    </div>
  );
};

export default Loader;
