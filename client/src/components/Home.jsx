import PeopleAlt from '@mui/icons-material/PeopleAlt';
import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const Home = () => {
  return (
    <div className="bg-indigo-500">
      <Header />
      <div className="flex flex-col md:flex-row text-white w-full h-[90vh] items-center gap-20 justify-between mt-10 px-[5%]">
        <div className="flex flex-col items-center justify-start">
          <p className="text-5xl font-extrabold self-start">Skylight employee</p>
          <p className="text-5xl font-extrabold self-start mt-4">
            Management system.
          </p>
          <p className="text-sm self-start mt-10">
            best employee management system out of the box
            <p className="text-sm self-start">
              you can use it every where without limitation.
            </p>
          </p>
          
        </div>
        <div className="w-auto flex justify-end">
          <img src="/manage1.webp" alt="" className="w-[90%]" />
        </div>
      </div>
    </div>
  );
};

export default Home;
