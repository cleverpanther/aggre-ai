import React from 'react';
import Link from 'next/link';

type CardWithImageProps = {
  cardName: string;
  cardImage: string;
  onClick?: () => void;
};

const CardWithImage = ({ cardName, cardImage, onClick }: CardWithImageProps) => {
  return (
    <div onClick={onClick} style={{ backgroundImage: `url(${cardImage})` }} className={`h-[360px] md:h-[280px] w-[90%] md:w-[22%] bg-cover rounded-[16px] relative mb-10 z-0 mr-8 cursor-pointer`}>
      <div className='backdrop-blur text-center p-3 absolute bottom-0 w-full'>
        {cardName}
      </div>
    </div>
  );
};

export default CardWithImage;
