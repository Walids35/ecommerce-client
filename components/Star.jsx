import React from 'react';

const Star = ({ count }) => {
  const stars = Array.from({ length: count }, (_, index) => index + 1);

  return (
    <div className='flex gap-1 mt-1'>
      {stars.map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 fill-current text-blue"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 16.928l-5.466 3.27 1.04-6.053L.347 7.802l6.08-.883L10 .822l3.522 6.097 6.08.883-4.227 3.343 1.04 6.053z"
          />
        </svg>
      ))}
    </div>
  );
};

export default Star;
