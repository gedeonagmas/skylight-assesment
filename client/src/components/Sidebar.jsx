import {
  ContactMail,
  Create,
  Dashboard,
  Key,
  LightbulbCircle,
  LogoutTwoTone,
  Person2,
  Public,
} from '@mui/icons-material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = (props) => {
  const navigate = useNavigate();
  const clickHandler = (id) => {
    props.setOverview(false);
    props.setPermissionScreen(false);
    props.setCreateScreen(false);
    props.setProfileScreen(false);
    const ids = ['overview', 'permission', 'create', 'profile'];
    ids.map((e) => {
      const a = document.getElementById(e);
      a?.classList?.remove('bg-gray-200', 'font-bold');
      if (id === e) {
        a?.classList?.add('bg-gray-200', 'font-bold');
      }
    });
    switch (id) {
      case 'overview':
        props.setOverview(true);
        break;
      case 'permission':
        props.setPermissionScreen(true);
        break;
      case 'create':
        props.setCreateScreen(true);
        break;
      case 'profile':
        props.setProfileScreen(true);
        props.setEditData(props.user);
        break;
      default:
        props.setOverview(true);
        break;
    }
  };
  
  return (
    <div className="w-[280px] gap-y-2 py-4 h-[100vh] text-gray-500 bg-white shadow-sm shadow-gray-300 border-r border-gray-200 flex flex-col items-center justify-start">
      <div className="flex w-full px-4 py-2 shadow-sm shadow-gray-300 border-b border-gray-200 gap-4 justify-start items-center">
        <div className="py-[2px] px-2 text-white rounded-md bg-indigo-500">
          <LightbulbCircle />
        </div>
        <p className="text-sm font-bold">Skylight</p>
      </div>

      <div
        id="overview"
        onClick={() => clickHandler('overview')}
        className="flex w-full px-4 cursor-pointer hover:bg-gray-200 bg-gray-200 font-bold py-[6px] gap-3 justify-start items-center"
      >
        <Dashboard fontSize="small" />
        <p className="text-sm">Overview</p>
      </div>

      <div
        id="permission"
        onClick={() => clickHandler('permission')}
        className="flex w-full px-4 cursor-pointer hover:bg-gray-200 py-[6px] gap-3 justify-start items-center"
      >
        <Key fontSize="small" />
        <p className="text-sm">Permission</p>
      </div>

      <div
        id="create"
        onClick={() => clickHandler('create')}
        className="flex w-full px-4 cursor-pointer hover:bg-gray-200 py-[6px] gap-3 justify-start items-center"
      >
        <Create fontSize="small" />
        <p className="text-sm">Create Employee</p>
      </div>

      {props.currentUser && (
        <Link
          state={{ user: props.currentUser, type: 'public' }}
          to="/chat"
          className="flex w-full px-4 cursor-pointer hover:bg-gray-200 py-[6px] gap-3 justify-start items-center"
        >
          <Public fontSize="small" />
          <p className="text-sm">Public chat</p>
        </Link>
      )}
      {props?.currentUser && props?.user?.role === 'superAdmin' && (
        <Link
          state={{ user: props?.currentUser, type: 'superAdmin' }}
          to="/chat"
          className="flex w-full px-4 cursor-pointer hover:bg-gray-200 py-[6px] gap-3 justify-start items-center"
        >
          <ContactMail fontSize="small" />
          <p className="text-sm">Contact admin</p>
        </Link>
      )}
      {props?.currentUser && props?.user?.role === 'admin' && (
        <Link
          state={{ user: props?.currentUser, type: 'admin' }}
          to="/chat"
          className="flex w-full px-4 cursor-pointer hover:bg-gray-200 py-[6px] gap-3 justify-start items-center"
        >
          <ContactMail fontSize="small" />
          <p className="text-sm">Contact super admin</p>
        </Link>
      )}
      <div
        id="profile"
        onClick={() => clickHandler('profile')}
        className="flex w-full px-4 cursor-pointer hover:bg-gray-200 py-[6px] gap-3 justify-start items-center"
      >
        <Person2 fontSize="small" />
        <p className="text-sm">Profile</p>
      </div>

      <div
        id="logout"
        onClick={() => navigate('/login')}
        className="flex w-full px-4 cursor-pointer hover:bg-gray-200 py-[6px] gap-3 justify-start items-center"
      >
        <LogoutTwoTone fontSize="small" />
        <p className="text-sm">Logout</p>
      </div>
    </div>
  );
};

export default Sidebar;
