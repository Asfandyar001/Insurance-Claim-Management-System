export default function Dashboard() {
  return (
    <div>
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold text-black dark:text-white">
          Claim(s) Require Attention
        </h1>
        <p className="text-sm text-gray-500">
          Monitor your claims and client management activities
        </p>
      </div>

      {/* Under Construction Notice */}
      <div className="mt-10 flex flex-col items-center justify-center p-6 border border-dashed border-gray-400 rounded-lg bg-gray-50 dark:bg-slate-900 dark:border-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 text-yellow-500 mb-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m0 3.75h.008v.008H12v-.008ZM10.343 3.94c.877-1.518 3.06-1.518 
            3.937 0l7.389 12.776c.877 1.518-.219 3.434-1.969 
            3.434H4.923c-1.75 0-2.846-1.916-1.969-3.434L10.343 
            3.94Z"
          />
        </svg>
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
          Under Construction
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          This section is currently being developed.
        </p>
      </div>
    </div>
  );
}
