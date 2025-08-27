import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Sidebar({ setOpenAddClaim }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      label: 'Dashboard',
      path: '/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>

      ),
      activeBg: 'bg-gray-300 dark:bg-slate-800',
      activeText: 'text-black dark:text-white',
    },
    {
      label: 'Active Claims',
      path: '/active',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-orange-400 dark:text-[#ED9B0C]">
          <path strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
      activeBg: 'bg-orange-100 dark:bg-[#ED9B0C]/12',
      activeText: 'text-orange-400 dark:text-[#ED9B0C]',
    },
    {
      label: 'Closed Claims',
      path: '/closed',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-green-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>

      ),
      activeBg: 'bg-green-100 dark:bg-[#169D48]/15',
      activeText: 'text-green-600 dark:text-[#169D48]',
    },
  ];

  return (
    <div
      className={`
        ${collapsed ? 'w-16' : 'w-70'}
        bg-white border-r-2 border-gray-200 dark:border-gray-800 min-h-screen transition-all duration-300
        flex-col dark:bg-slate-950
      `}
    >

      {/* This div is for main CompanyName and software type then a button for collapsing */}
      <div className={`py-3.5 ${collapsed ? 'justify-center' : 'justify-between'} flex items-center border-b-2 border-gray-200 dark:border-gray-800`}>
        {!collapsed && (
          <div className="flex flex-col ml-4">
            <h2 className="text-lg font-bold dark:text-white">LEADS</h2>
            <p className="text-xs text-gray-500">Management System</p>
          </div>
        )}

        <div className={`${collapsed ? 'my-0.5 hover:bg-gray-200 transition-colors rounded-md' : ' hover:bg-gray-200 transition-colors rounded-md  mr-2'} p-2 cursor-pointer dark:hover:bg-gray-800`} onClick={() => setCollapsed(!collapsed)}>
          <button
            className={`
              text-gray-700 transition-transform duration-400 cursor-pointer dark:text-white
              ${collapsed ? 'rotate-180' : 'rotate-0'}
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* This div is add Claim */}
      <div className="p-4 space-y-2 border-b-2 border-gray-200 dark:border-gray-800">
        {!collapsed && (
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Quick Actions
          </h3>
        )}

        <button
          onClick={() => setOpenAddClaim(true)}
          className={`w-full h-10 cursor-pointer transition-all duration-200 rounded-md flex items-center ${collapsed ? "px-2 justify-center" : "px-3 justify-start"
            } hover:scale-105`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 text-emerald-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>

          {!collapsed && (
            <span className="ml-3 font-medium text-sm dark:text-white">Add New Claim</span>
          )}
        </button>
      </div>

      {/* Menu */}
      <div className="flex-1 p-4 space-y-2">
        {!collapsed && (
          <h3 className="text-xs font-semibold text-gray-500 text-muted-foreground uppercase tracking-wider mb-3">
            Navigation
          </h3>
        )}
        <ul className="space-y-2 list-none p-0">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path} className="relative group">
                <Link
                  to={item.path}
                  className={`flex ${!collapsed ? "pl-5" : "justify-center"} py-2 items-center rounded-md transition-colors
                    ${isActive
                      ? `${item.activeBg} ${item.activeText} border-2 dark:border-1 ${item.activeText} `
                      : 'hover:bg-gray-100 text-black dark:text-white dark:hover:bg-gray-800'}
                      font-medium`}

                >
                  {item.icon}

                  {!collapsed && (
                    <span className='ml-4'>
                      {item.label}
                    </span>
                  )}
                </Link>


                {/* Tooltip when collapsed */}
                {collapsed && (
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
