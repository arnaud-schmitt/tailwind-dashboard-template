import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'

import Header from '../../partials/Header';
import Sidebar from '../../partials/Sidebar';
import FilterButton from '../../components/DropdownFilter';
import Datepicker from '../../components/Datepicker';
import Banner from '../../partials/Banner';
import NodeRow from './components/NodeRow';

function Network() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [nodes, setNodes] = useState([]);

  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('http://localhost:3000/nodes')
        .then((res) => res.json()
        .then((data) => setNodes(data)))
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
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Network</h1>
                <button className='border border-gray-700 px-4 py-2 w-fit rounded-lg pretty-hovering'>
                <Link className='font-bold text-xl' to='/'> Home </Link>
              </button>
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
            <table className='table-auto bg-white dark:bg-gray-800 shadow-sm rounded-xl w-full'>
              <thead>
                <tr>
                  {
                    nodes && nodes?.length > 0 && Object.keys(nodes[0]).map((key) => {
                      return <th key={key} className='cursor-pointer font-bold text-gray-200 text-left py-2 px-4'>{key}</th>
                    })
                  }
                </tr>
              </thead>
              <tbody>
              {
                nodes && nodes?.length > 0 && nodes.map((node) => {
                  return <NodeRow key={node.id} node={node} />
                })
              }
              </tbody>
            </table>
  
          </div>
        </main>
  
        <Banner />
  
      </div>
    </div>
  );
}

export default Network;