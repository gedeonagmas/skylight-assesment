import PeopleAlt from '@mui/icons-material/PeopleAlt';
import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="bg-indigo-700 px-[5%] py-4  text-white text-[16px] w-full h-400 fixed top-0 left-0 flex items-center justify-between">
      <div className="flex items-center justify-center gap-x-4">
        <PeopleAlt xs={{ width: 56, height: 56 }} />
        <div className="">
          <p className="font-bold text-[18px]">Employee</p>
          <p className="font-bold text-[14px] -mt-2">management</p>
        </div>
      </div>
      <div className="flex gap-8">
        <Link
          to="/login"
          className="w-20 py-2 px-4 rounded-md hover:bg-gray-200 bg-white text-black"
        >
          Login 
        </Link>
        <Link
          to="/signup"
          className="w-20 py-2 px-4 rounded-md hover:bg-gray-200 bg-white text-black"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}

export default Header