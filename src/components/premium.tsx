import Image from "next/image";
import React from "react";

const PremiumCard = () => {
  return (
    <div className="w-full h-screen fixed top-0 z-100 backdrop-blur-3xl flex items-center  opacity-95">
      <div className="ml-[43vw] md:ml-[35vw]">
        <Image src={"/icons/lock.svg"} height={70} width={70} alt="Premium" />
        <h3 className="mt-3">PREMIUM</h3>
      </div>
    </div>
  );
};

export default PremiumCard;
