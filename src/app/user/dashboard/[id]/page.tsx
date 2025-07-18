import Image from "next/image";

const Dashboard = () => {
  return (
    <div className="flex flex-col p-10 gap-y-8">
      {/* Top Section: Avatar & Info Box */}
      <div className="flex flex-row gap-x-10 items-start">
        <div className="avatar">
          <div className="w-48 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <Image
              src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
              alt="User profile picture"
              width={192}
              height={192}
            />
          </div>
        </div>

        <div className="collapse bg-base-100 border border-base-300 w-full max-w-xl">
          <input type="radio" name="my-accordion-1" defaultChecked />
          <div className="collapse-title font-semibold">
            How do I create an account?
          </div>
          <div className="collapse-content text-sm">
            Click the &quot;Sign Up&quot; button in the top right corner and follow the registration process.
          </div>
        </div>
      </div>

      {/* Bottom Section: Sidebar Menu & Another Box */}
      <div className="flex flex-row gap-x-10 p-2">
        <ul className="menu bg-gray-100 rounded-box w-20">
          <li>
            <a className="tooltip tooltip-right" data-tip="Dashboard">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </a>
          </li>
          <li>
            <a className="tooltip tooltip-right" data-tip="Information">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </a>
          </li>
          <li>
            <a className="tooltip tooltip-right" data-tip="Work List">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </a>
          </li>
        </ul>

        <div className="collapse bg-base-100 border border-base-300 w-full max-w-xl">
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title font-semibold">
            How do I view my dashboard?
          </div>
          <div className="collapse-content text-sm">
            Once you’re logged in, your dashboard will be available via the top navigation bar.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
