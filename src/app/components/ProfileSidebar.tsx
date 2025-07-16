"use client";
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const ProfileSidebar = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  return (
    <aside className="w-64 bg-white shadow-md border-r border-gray-200 h-full p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">USER MENU</h2>

      <Link href={userId ? `/user/dashboard/${userId}` : '/login'}>
        <div className="rounded-lg px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer justify-items-center">
          <p className="text-gray-800 font-medium">DashBoard</p>
        </div>
      </Link>

      <Link href={userId ? `/user/Information/${userId}` : '/login'}>
        <div className="rounded-lg px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer justify-items-center">
          <p className="text-gray-800 font-medium">Information</p>
        </div>
      </Link>

      <Link href={userId ? `/user/worklist/${userId}` : '/login'}>
      <div className="rounded-lg px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer justify-items-center">
          <p className="text-gray-800 font-medium">Work List</p>
        </div>
      </Link>
    </aside>
  );
};

export default ProfileSidebar;
