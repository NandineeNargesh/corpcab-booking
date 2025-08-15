import CardsList from 'data/CardsList';
import React, { useState } from 'react';
import Image from 'next/image';

function Cards() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className='p-4 pl-5 pr-5'>
      <h2 className='text-[17px] font-semibold'>Payment Methods</h2>
      <div className='p-3 grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-5 grid-cols-5 mt-2'>
        {CardsList.map((item, index) => (
          <div
            key={item.id}
            className={`transform transition-transform duration-200 p-1 w-[50px] border border-gray-300 cursor-pointer shadow-sm hover:shadow-lg hover:scale-115 hover:bg-blue-50 rounded-md flex justify-center ${
              activeIndex === index
                ? 'bg-blue-100 transform transition-transform duration-200 scale-115 border-[2px] border-indigo-500'
                : ''
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={40}
              height={50}
              unoptimized={typeof item.image === 'string'} // avoid optimization for /public paths
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
