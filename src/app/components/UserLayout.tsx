import ProfileSidebar from "./ProfileSidebar";
import HeaderMain from "./HeaderMain";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <HeaderMain />
      <div className="flex flex-1">
        <aside className="left-0 top-20 bg-white shadow-sm border-r border-gray-200 z-40 rounded-md">
            <ProfileSidebar />
        </aside>
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
