'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Dropdown = ({
  options = [],
  placeholder = "เลือกตัวเลือก",
  onSelect = () => {},
  defaultValue = "",
  className = "",
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue || placeholder);
  const dropdownRef = useRef(null);

  // ปิด dropdown เมื่อคลิกนอกพื้นที่
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // เปิด/ปิด dropdown
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  // จัดการการเลือกตัวเลือก
  const handleOptionSelect = (option) => {
    const label = typeof option === 'object' ? option.label : option;
    setSelectedOption(label);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className={`w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg shadow-sm flex items-center justify-between transition-all duration-200 ${
          disabled
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'hover:border-blue-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
        }`}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={`font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
          {selectedOption}
        </span>
        
        {!disabled && (
          <div className="ml-2 flex-shrink-0">
            {isOpen ? (
              <ChevronUp className="h-5 w-5 text-gray-500 transition-transform duration-200" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-200" />
            )}
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && !disabled && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="py-2 max-h-60 overflow-y-auto">
            {options.length === 0 ? (
              <div className="px-4 py-3 text-gray-500 text-center text-sm">
                ไม่มีตัวเลือกให้เลือก
              </div>
            ) : (
              options.map((option, index) => {
                const isObject = typeof option === 'object';
                const label = isObject ? option.label : option;
                const icon = isObject ? option.icon : null;

                return (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    className="w-full text-left px-4 py-3 hover:bg-blue-50 text-gray-700 transition-colors duration-150 flex items-center space-x-3 focus:outline-none focus:bg-blue-50 border-b border-gray-100 last:border-b-0"
                    role="option"
                  >
                    {icon && (
                      <span className="text-lg flex-shrink-0">{icon}</span>
                    )}
                    <span className="font-medium">{label}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;