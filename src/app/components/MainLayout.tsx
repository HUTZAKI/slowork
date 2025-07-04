'use client';

import React, { useEffect, useState } from 'react';
import HeaderMain from './HeaderMain';
import JobFilterSidebar from './JobFilterSidebar';

interface MainLayoutProps {
  children: (props: { filteredJobs: unknown[] }) => React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [filteredJobs, setFilteredJobs] = useState<unknown[]>([]);

  // Load jobs on first mount
  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch('/api/jobs');
      const data = await res.json();
      setFilteredJobs(data); // show all at first
    };
    fetchJobs();
  }, []);

  // Handle search from sidebar
  const handleSearch = async (filters: unknown) => {
    try {
      const res = await fetch('/api/jobs/filter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filters),
      });
  
      const data = await res.json();
      setFilteredJobs(data);
    } catch (err) {
      console.error('Filter error:', err);
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <HeaderMain />
      <div className="flex flex-1 relative">
        <aside className="fixed left-0 top-20 w-80 h-[calc(100vh-5rem)] bg-white shadow-sm border-r border-gray-200 z-40 rounded-md">
          <JobFilterSidebar onSearch={handleSearch} />
        </aside>
        <main className="flex-1 ml-80 p-6">
          <div className="max-w-6xl mx-auto">
            {children({ filteredJobs })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
