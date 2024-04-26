import Image from "next/image";
import React, { useEffect, useState } from "react";


type ProgressBarProps = {
  time: number;
};

const ProgressBar = ({time}: ProgressBarProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          return 100;
        }
        const diff = 100 / time;
        return Math.min(oldProgress + diff, 100);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <>
        <div className="flex flex-col mb-10">
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
          <p className="ml-6 text-green-500 text-[12px]">{progress.toFixed(0)}% Loading...</p>
          <div className=" w-[250px] md:w-[500px] bg-gray-200 h-2 rounded-[16px] mt-4 ml-6 ">
            <div
              style={{ width: `${progress}%` }}
              className="bg-green-500 rounded-[16px] h-2 transition-all duration-1000 ease-in-out"
            ></div>
          </div>
        </div>
      </>
    </div>
  );
};

export default ProgressBar;
