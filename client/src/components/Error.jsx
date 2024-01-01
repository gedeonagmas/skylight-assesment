import Close from '@mui/icons-material/Close';
import React from 'react';

const Error = ({ errors, isSingle, setError }) => {
  return (
    <div className="absolute z-30 top-32 right-10 rounded-md px-4 py-4 bg-red-200 text-black text-sm h-auto w-auto">
      {errors && !isSingle && (
        <p className="font-bold underline">Error messages ({errors?.length})</p>
      )}
      <div
        onClick={()=>setError(false)}
        className="absolute top-1 right-1 rounded-md p-1 text-red-400 hover:text-red-500 cursor-pointer"
      >
        <Close />
      </div>
      {errors &&
        isSingle===false &&
        errors.map((error, i) => {
          return (
            <p key={i} className="text-red-500">
              {i + 1}. {error.msg.split('#')[0]}. <br />{error.msg.split('#')[1]}
            </p>
          );
        })}
      {isSingle && <p className="text-red-500 mt-3 p-4">{errors}.</p>}
    </div>
  );
};

export default Error;
