import {People, Security, Watch, Work } from '@mui/icons-material';
import AccessTimeFilled from '@mui/icons-material/AccessTimeFilled';
import React from 'react'

const NavBar = ({user,totalEmployee}) => {
  return (
    <div className="w-full h-auto text-white shadow-sm shadow-gray-300 border-r absolute top-0 overflow-y-scroll border-gray-200 flex items-center justify-between">
      <div className="px-3 py-2 flex flex-col rounded-md text-gray-500  text-sm items-center justify-center">
        <div className="flex items-center justify-center gap-1">
          <AccessTimeFilled />
          <p className="">
            {new Date().toString().split(' ').splice(0, 3).join(' ')}{' '}
            {new Date().toLocaleTimeString().split(':').splice(0, 2).join(':')}{' '}
            {new Date().toLocaleTimeString().split(' ')[1]}
          </p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p className="">Good morning</p>
          <p className="font-bold">{user.userName}</p>
        </div>
      </div>
      <div className="px-3 py-2 flex flex-col rounded-md text-gray-500 text-sm items-center justify-center">
        <div className="flex items-center justify-start gap-2">
          <People />
          <p className="">Employees</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p className="">Total {totalEmployee-2 }</p>
        </div>
          </div>
          <div className="px-3 py-2 flex flex-col rounded-md text-gray-500 text-sm items-center justify-center">
        <div className="flex items-center justify-start gap-2">
          <Security />
          <p className="">Role</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p className="">{user.role}</p>
        </div>
      </div>
      <div className="px-3 py-2 flex rounded-md bg-indigo-400 text-sm items-center gap-2 justify-start">
        <div className="flex flex-col">
          <p className="self-end">{user.fullName}</p>{' '}
          <p className="">{user.email}</p>
        </div>
        <img
          src={`http://localhost:5000/uploads/${user.profilePicture}`}
          alt=""
          className="w-10 h-10 rounded-full border"
        />
      </div>
    </div>
  );
}

export default NavBar;