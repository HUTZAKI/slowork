import Link from 'next/link';

const HeaderHome = () => {
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
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-200">
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

            {/* Right Section: Auth Links */}
            <div className="flex items-center space-x-2">
              <Link href="/login">
                <div className="px-6 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200">
                  เข้าสู่ระบบ
                </div>
              </Link>
              
              <Link href="/register">
                <div className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg">
                  สมัครสมาชิก
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderHome;