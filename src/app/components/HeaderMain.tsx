'use client';

import Link from 'next/link';
import Dropdown from './Dropdown';
import { useRouter } from 'next/navigation';

const HeaderMain = () => {
  const router = useRouter();

  // ตัวเลือกการค้นหา
  const searchOptions = [
    { 
      label: 'ค้นหาตำแหน่งงาน', 
      value: '/roleposition', 
      action: 'job-search',
      icon: '💼'
    },
    { 
      label: 'ค้นหานักศึกษาฝึกงาน', 
      value: '/searchwork', 
      action: 'intern-search',
      icon: '🎓'
    },
    { 
      label: 'ค้นหาผู้หางาน', 
      value: '/candidates', 
      action: 'candidate-search',
      icon: '👤'
    }
  ];

  // การจัดการเมื่อเลือกตัวเลือกค้นหา
  const handleSearchSelect = (option: unknown) => {
    console.log('Selected:', option);

    if (typeof option === 'object' && option !== null && 'value' in option) {
      const searchOption = option as { value?: string };
      if (searchOption.value) {
        router.push(searchOption.value);
      }
    }
  };

  // เมนูด้านขวา
  const navigationItems = [
    { label: 'เกี่ยวกับเรา', href: '/about' },
    { label: 'ติดต่อเรา', href: '/contact' }
  ];

  return (
    <>
      {/* Spacer for fixed header */}
      <div className="h-20"></div>
      
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-lg z-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            
            {/* Left Section: Logo & Brand */}
            <div className="flex items-center space-x-4">
              <Link href="/testbar" className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
              </Link>
              
              <Link href="/" className="group">
                <div className="px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <h1 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    SLOwORK
                  </h1>
                </div>
              </Link>
            </div>

            {/* Middle Section: Search Dropdown */}
            <div className="flex-1 max-w-md mx-8">
              <Dropdown
                options={searchOptions}
                placeholder="เลือกการค้นหา"
                onSelect={handleSearchSelect}
                className="w-full"
              />
            </div>

            {/* Right Section: Navigation & Profile */}
            <div className="flex items-center space-x-2">
              {/* Navigation Links */}
              {navigationItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}

              {/* Profile Button */}
              <button className="ml-4 px-6 py-2 text-blue-600 font-medium border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Profile
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderMain;