import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'

import Header from '../../partials/Header';
import Sidebar from '../../partials/Sidebar';
import FilterButton from '../../components/DropdownFilter';
import Datepicker from '../../components/Datepicker';
import Banner from '../../partials/Banner';
import NodeRow from './components/NodeRow';
import DashboardCard01 from '../../partials/dashboard/DashboardCard01';
import DashboardCard01D3 from '../../partials/dashboard/DashboardCard01D3';
import TabSelector from '../../components/TabSelector';

function Traffic() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('Traffic');

  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('http://localhost:3000/applications')
        .then((res) => res.json()
        .then((data) => setApplications(data)))
  })

  return (
    <div className="flex h-screen overflow-hidden">
  
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
  
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
  
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-2 py-8 w-full max-w-9xl mx-auto">
  
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
  
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0 flex flex-row gap-6">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Traffic</h1>
                <button className='border border-gray-700 px-4 py-2 w-fit rounded-lg pretty-hovering'>
                  <Link className='font-bold text-xl' to='/'> Home </Link>
                </button>
                <TabSelector
                  tabValues={['Traffic', 'Viewer', 'Inspection', 'Geo']}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab} />
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

            <div className='flex flex-col gap-8'>

              {<DashboardCard01 />}

              <table className='table-auto bg-white dark:bg-gray-800 shadow-sm rounded-xl w-full'>
                <thead>
                  <tr>
                    {
                      applications && applications?.length > 0 && Object.keys(applications[0]).map((key) => {
                        return <th key={key} className='cursor-pointer font-bold text-gray-200 text-left py-2 px-4'>{key}</th>
                      })
                    }
                  </tr>
                </thead>
                <tbody>
                {
                  applications && applications?.length > 0 && applications.map((app) => {
                    return <tr className='pretty-hovering px-5 py-4 border-b border-gray-100 dark:border-gray-700/60'>
                    {Object.keys(app).map((key) => {
                      let specificStyle = '';
                      if (key === 'download') {
                        specificStyle = app[key] !== '0' ? 'text-blue-500' : 'text-gray-600';
                      } else if (key === 'upload') {
                        specificStyle = app[key] !== '0' ? 'text-violet-500' : 'text-gray-600';
                      }
                      let value = app[key];
                      if (key === 'download' || key === 'upload') {
                        value = `${value} bps`;
                      }
                      return <td className={`${specificStyle} text-xs text-left px-4 py-1 text-nowrap overflow-ellipsis overflow-hidden max-w-32 whitespace-nowrap`}>{value}</td>
                    })}
                  </tr>
                  })
                }
                </tbody>
              </table>
            </div>
  
          </div>
        </main>
  
        <Banner />
  
      </div>
    </div>
  );
}

export default Traffic;
