import React from 'react';

const Success = ({ message }) => {
  return (
    <div className="absolute z-30 top-32 right-10 rounded-md px-4 py-4 bg-emerald-200 text-black text-sm h-auto w-auto">
      {message  && (
        <p className="text-emerald-500 font-bold">
          {message}
        </p>
      )}
    </div>
  );
};

export default Success;
 