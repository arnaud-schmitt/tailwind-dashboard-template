import React from 'react';
import { Link } from "react-router-dom";

import Header from '../partials/Header';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';
import Banner from '../partials/Banner';

function NotFound() {
  return (
    <div className="flex h-screen overflow-hidden">
  
  
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
  
        {/*  Site header */}
        <Header sidebarOpen={false} setSidebarOpen={() => { }} />
  
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
  
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
  
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">The page you are looking for does not exist</h1>
              </div>
  
              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                <FilterButton align="right" />
                {/* Datepicker built with flatpickr */}
                <Datepicker align="right" />
                {/* Add view button */}
                <button className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">
                  <svg className="fill-current shrink-0 xs:hidden" width="16" height="16" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="max-xs:sr-only">Add View</span>
                </button>                
              </div>
  
            </div>
  
            {/* Cards */}
            <div className="mt-16 flex flex-col gap-6 text-center items-center">
  
              <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Return Home : </h1>
              <button className='border border-gray-700 px-4 py-2 w-fit rounded-lg pretty-hovering'>
                <Link className='font-bold text-xl' to='/'> Home </Link>
              </button>
              
            </div>
  
          </div>
        </main>
  
        <Banner />
  
      </div>
    </div>
  );
}

export default NotFound;