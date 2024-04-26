import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="bg-[url('/images/header-bg.png')] bg-center w-[92%] md:w-[98%] h-[300px] rounded-[20px] bg-cover m-4 flex items-center justify-center ">
      <div className="flex items-center text-center flex-col justify-center gap-2">
        <h1 className="text-3xl font-bold">Let’s Craft something New</h1>
        <p className="text-gray-400">Choose what AI tools do you need for today</p>
      </div>
    </div>
  );
};

export default Header;
