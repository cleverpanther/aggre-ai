import Image from "next/image";
import React from "react";
import { suggestionDemo } from "./suggestion-data-demo";

const SuggestionCard = () => {
  return (
    <>
      {suggestionDemo.map((suggestion) => (
        <div
          key={suggestion.id}
          className="w-[85%] md:w-[45%] m-8 border-[1px] border-gray-700 rounded-[16px] p-4 flex items-center justify-between mt-0 mr-0 cursor-pointer"
        >
          <div>
            <p>{suggestion.title}</p>
            <p className="text-[12px] text-gray-500">
              {suggestion.description}
            </p>
          </div>
          <Image
            src={suggestion.iconPath}
            height={30}
            width={30}
            alt="recorder"
          />
        </div>
      ))}
    </>
  );
};

export default SuggestionCard;
