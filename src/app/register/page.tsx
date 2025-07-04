'use client';

import { useState } from 'react';
import Link from 'next/link';
import HeaderHome from '../components/HeaderHome';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('รหัสผ่านไม่ตรงกัน');
      return;
    }
    
    if (!acceptTerms) {
      alert('กรุณายอมรับเงื่อนไขการใช้งาน');
      return;
    }
    
    console.log('Registering with:', { name, email, password });
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <HeaderHome />
      
      <div className="flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Register Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
              <h2 className="text-2xl font-bold text-white text-center">
                สมัครสมาชิก
              </h2>
              <p className="text-blue-100 text-center mt-2">
                เริ่มต้นการเดินทางกับเรา
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleRegister} className="px-8 py-8 space-y-5">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  ชื่อ-นามสกุล
                </label>
                <input
                  type="text"
                  placeholder="กรอกชื่อและนามสกุลของคุณ"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  อีเมล
                </label>
                <input
                  type="email"
                  placeholder="กรอกอีเมลของคุณ"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  รหัสผ่าน
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="กรอกรหัสผ่านของคุณ"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  ยืนยันรหัสผ่าน
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="กรอกรหัสผ่านอีกครั้ง"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showConfirmPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-1"
                />
                <label htmlFor="acceptTerms" className="text-sm text-gray-700">
                  ฉันยอมรับ{' '}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">
                    เงื่อนไขการใช้งาน
                  </Link>{' '}
                  และ{' '}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">
                    นโยบายความเป็นส่วนตัว
                  </Link>
                </label>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
              >
                สมัครสมาชิก
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">หรือ</span>
                </div>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-gray-600">
                  มีบัญชีอยู่แล้ว?{' '}
                  <Link href="/login" className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-colors">
                    เข้าสู่ระบบ
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Security Info */}
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 mt-6 border border-white/20">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <span>🔒</span>
              <span>ข้อมูลของคุณปลอดภัยและเป็นความลับ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;