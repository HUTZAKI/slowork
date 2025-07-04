'use client';

import { useState } from 'react';

interface BenefitsType {
  socialSecurity: boolean;
  bonus: boolean;
  overtime: boolean;
  commission: boolean;
  transport: boolean;
  food: boolean;
  uniform: boolean;
  fund: boolean;
  accommodation: boolean;
}

interface FiltersType {
  jobCategory: string;
  province: string;
  organizationType: string;
  workplace: string;
  workDays: string;
  salary: string;
  onlineInterview: boolean;
  acceptNewGrad: boolean;
  benefits: BenefitsType;
}

interface JobFilterSidebarProps {
  onSearch: (filters: FiltersType) => void;
}

const JobFilterSidebar = ({onSearch}: JobFilterSidebarProps) => {
  const [filters, setFilters] = useState<FiltersType>({
    jobCategory: '',
    province: '',
    organizationType: '',
    workplace: '',
    workDays: '',
    salary: '',
    onlineInterview: false,
    acceptNewGrad: false,
    benefits: {
      socialSecurity: false,
      bonus: false,
      overtime: false,
      commission: false,
      transport: false,
      food: false,
      uniform: false,
      fund: false,
      accommodation: false
    }
  });

  // ข้อมูลสำหรับ dropdown fields
  const dropdownFields = [
    { 
      label: 'หมวดหมู่งาน', 
      field: 'jobCategory', 
      placeholder: 'เลือกหมวดหมู่งาน',
      options: ['IT/เทคโนโลยี', 'การตลาด', 'ขาย', 'บัญชี/การเงิน', 'ทรัพยากรบุคคล']
    },
    { 
      label: 'จังหวัด', 
      field: 'province', 
      placeholder: 'เช่น เชียงใหม่',
      options: ['กรุงเทพฯ', 'เชียงใหม่', 'ขอนแก่น', 'หาดใหญ่', 'ระยอง']
    },
    { 
      label: 'รูปแบบองค์กร', 
      field: 'organizationType', 
      placeholder: 'ทั้งหมด',
      options: ['บริษัทเอกชน', 'หน่วยงานราชการ', 'รัฐวิสาหกิจ', 'องค์กรไม่แสวงหาผลกำไร']
    },
    { 
      label: 'สถานที่ปฏิบัติงาน', 
      field: 'workplace', 
      placeholder: 'ทั้งหมด',
      options: ['ที่สำนักงาน', 'ทำงานจากบ้าน', 'แบบผสม', 'ลูกค้า/สนาม']
    },
    { 
      label: 'จำนวนวันทำงาน', 
      field: 'workDays', 
      placeholder: 'ทั้งหมด',
      options: ['5 วัน', '6 วัน', '7 วัน', 'ยืดหยุ่น']
    },
    { 
      label: 'เงินเดือน/เบี้ยเลี้ยง', 
      field: 'salary', 
      placeholder: 'ทั้งหมด',
      options: ['ต่ำกว่า 15,000', '15,000 - 25,000', '25,000 - 35,000', '35,000 - 50,000', 'มากกว่า 50,000']
    }
  ];

  // ข้อมูลสำหรับ benefits
  const benefitsList = [
    { key: 'socialSecurity', label: 'ประกันสังคม' },
    { key: 'bonus', label: 'โบนัส' },
    { key: 'overtime', label: 'ค่าล่วงเวลา' },
    { key: 'commission', label: 'ค่าคอมมิชชั่น' },
    { key: 'transport', label: 'ค่าเดินทาง' },
    { key: 'food', label: 'อาหาร' },
    { key: 'uniform', label: 'ชุดพนักงาน' },
    { key: 'fund', label: 'กองทุนสำรองเลี้ยงชีพ' },
    { key: 'accommodation', label: 'ที่พัก' }
  ];

  // Handle dropdown changes
  const handleDropdownChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (field: string, nested = false) => {
    if (nested) {
      setFilters(prev => ({
        ...prev,
        benefits: {
          ...prev.benefits,
          [field as keyof BenefitsType]: !prev.benefits[field as keyof BenefitsType]
        }
      }));
    } else {
      setFilters(prev => ({ ...prev, [field]: !prev[field as keyof FiltersType] }));
    }
  };

  const handleReset = () => {
    const resetFilters = {
      jobCategory: '',
      province: '',
      organizationType: '',
      workplace: '',
      workDays: '',
      salary: '',
      onlineInterview: false,
      acceptNewGrad: false,
      benefits: {
        socialSecurity: false,
        bonus: false,
        overtime: false,
        commission: false,
        transport: false,
        food: false,
        uniform: false,
        fund: false,
        accommodation: false
      }
    };
  
    setFilters(resetFilters);
  
    if (onSearch) {
      onSearch(resetFilters);
    }
  };

  // Handle search
  const handleSearch = () => {
    if (onSearch) {
      onSearch(filters); // sends to MainLayout
    }
  };

  return (
    <div className="w-full max-w-xs bg-white shadow-lg rounded-lg border border-gray-200 flex flex-col h-full">
      {/* Fixed Header */}
      <div className="p-6 border-b border-gray-200 bg-white rounded-t-lg">
        <h2 className="text-xl font-bold text-gray-800">ตัวกรองค้นหางาน</h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Dropdown Filters */}
        <div className="space-y-4">
          {dropdownFields.map(({ label, field, placeholder, options }) => (
            <div key={field} className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                {label}
              </label>
              <select
                value={filters[field as keyof FiltersType] as string}
                onChange={(e) => handleDropdownChange(field, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="">{placeholder}</option>
                {options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Additional Options */}
        <div className="space-y-3 pt-2 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700">ตัวเลือกเพิ่มเติม</h3>
          
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.onlineInterview}
              onChange={() => handleCheckboxChange('onlineInterview')}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">รองรับการสัมภาษณ์ออนไลน์</span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.acceptNewGrad}
              onChange={() => handleCheckboxChange('acceptNewGrad')}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">งานที่ยินดีรับเด็กจบใหม่</span>
          </label>
        </div>

        {/* Benefits */}
        <div className="space-y-3 pt-2 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700">สวัสดิการ</h3>
          
          <div className="grid grid-cols-1 gap-2">
            {benefitsList.map(({ key, label }) => (
              <label key={key} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.benefits[key as keyof BenefitsType]}
                  onChange={() => handleCheckboxChange(key, true)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Action Buttons */}
      <div className="p-6 border-t border-gray-200 bg-white rounded-b-lg">
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 py-2.5 px-4 bg-gray-100 text-gray-700 rounded-md font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          >
            รีเซ็ต
          </button>
          <button
            onClick={handleSearch}
            className="flex-1 py-2.5 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            ค้นหา
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobFilterSidebar;