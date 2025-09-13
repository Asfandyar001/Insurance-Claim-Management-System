import { useState, useEffect } from "react";
import CustomSelect from "../components/CustomeSelect";
import axios from 'axios';


export default function Active() {
  const filter1 = ["Due Next", "Date of Loss", "Amount Made"];
  const icon1 = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 dark:text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
  </svg>;

  const filter2 = ["Ascending", "Descending"];

  const icon2 = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 dark:text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
  </svg>

  const opt = [{
    content: (<div className="flex flex-row justify-center items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
      </svg>
      <p>Edit Claim</p>
    </div>),
  }, {
    content: (
      <div className="flex flex-row justify-center items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
        <p>Generate Report</p>
      </div>
    ),
  },
  {
    content: (
      <div className="flex flex-row justify-center items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
        </svg>
        <p>Share Claim</p>
      </div>
    ),
  },
  {
    content: (
      <div className="flex flex-row justify-center items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        <p>Export CSV</p>
      </div>
    ),
  }]

  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const res = await axios.get("/api/claims/active");
        setClaims(res.data);
        console.log(res.data)
      } catch (err) {
        setError(
          "We’re having trouble reaching the server. Check your internet connection or contact support if the issue continues."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  const getAssessmentLabel = (type) => {
    switch (type) {
      case "On-Site":
        return "Site Inspection";
      case "Desktop":
        return "Follow-up Call";
      default:
        return "None";
    }
  };

  const filteredClaims = claims.filter((claim) => {
    const query = searchQuery.toLowerCase();
    return (
      claim.claimNo?.toLowerCase().includes(query) ||
      claim.lcmRef?.toLowerCase().includes(query) ||
      claim.lossType?.toLowerCase().includes(query)
    );
  }).sort((a, b) => {
    if (!sortBy) return 0;

    let aVal, bVal;
    switch (sortBy) {
      case "Due Next":
        aVal = a.dueDate;
        bVal = b.dueDate;
        break;
      case "Date of Loss":
        aVal = new Date(a.dateOfLoss);
        bVal = new Date(b.dateOfLoss);
        break;
      case "Amount Made":
        aVal = a.amountMade || 0;
        bVal = b.amountMade || 0;
        break;
      default:
        return 0;
    }

    if (sortOrder === "Descending") {
      return bVal > aVal ? 1 : -1;
    }
    return aVal > bVal ? 1 : -1;
  });


  if (loading || error) {
    return (
      <div className="flex items-center justify-center mt-50">
        {loading && <p className="text-gray-600 dark:text-gray-300">Loading claims...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold text-black dark:text-white">
          Active Claims Management
        </h1>
        <p className="text-sm text-gray-500">Manage and track insurance claims</p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-row mt-6 rounded-lg border-gray-300 dark:border-gray-600 gap-4">
        {/* Search input */}
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            {/* Using lucide-react Search icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-gray-400 dark:text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search claims by number, LCM ref or loss type..."
            className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 dark:border-gray-800 rounded-md text-gray-900 dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>


        {/* Custom select */}
        <div className="flex flex-row gap-2">
          <CustomSelect
            options={filter1}
            onChange={(value) => setSortBy(value)}
            icon={icon1}
            width="w-44"
          />
          <CustomSelect
            options={filter2}
            onChange={(value) => setSortOrder(value)}
            icon={""}
            width="w-33"
          />
        </div>
      </div>

      {filteredClaims.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-30 gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-14 text-neutral-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
          <p className="text-gray-400 font-medium">No claims found.</p>
        </div>
      ) : (
        <ul className="mt-4 space-y-2">
          {filteredClaims.map((claim) => (
            <li
              key={claim._id}
              className="border mb-4 p-4 hover:shadow-md transition-all duration-300 rounded-lg border-gray-300 dark:border-gray-800 flex flex-col gap-4"
            >
              <div>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row justify-center items-center gap-2">
                    <h2 className="text-lg font-medium dark:text-white">{claim.claimNo}</h2>
                    <div className="flex items-center justify-center border rounded-4xl h-5.5 border-green-600 px-2.5 bg-green-100 dark:bg-[#169D48]/15 dark:border-[#169D48]/15">
                      <p className="text-xs text-green-600 dark:text-[#169D48] font-medium">Active</p>
                    </div>

                  </div>
                  <div className="flex flex-row gap-1 justify-center items-center py-1 px-1.5 rounded-sm bg-gray-100 text-gray-500 dark:bg-slate-900 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <p className="text-sm">Due: {getAssessmentLabel(claim.assessmentType)}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-500">LCM: {claim.lcmRef}</p>
              </div>

              <div className="flex fex-row items-center justify-start gap-36">
                <div className="flex flex-row justify-start items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  <div className="flex flex-col justify-center gap-0">
                    <p className="text-sm font-medium dark:text-white">{claim.insured.name}</p>
                    <p className="text-sm text-gray-500">Insured</p>
                  </div>
                </div>

                <div className="flex flex-row justify-start items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                  <div className="flex flex-col justify-center gap-0">
                    <p className="text-sm font-medium dark:text-white">{claim.lossType}</p>
                    <p className="text-sm text-gray-500">Loss Type</p>
                  </div>
                </div>

                <div className="flex flex-row justify-start items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
                  </svg>
                  <div className="flex flex-col justify-center gap-0">
                    <p className="text-sm font-medium dark:text-white">{claim.dateOfLoss?.split("T")[0]}</p>
                    <p className="text-sm text-gray-500">Loss Date</p>
                  </div>
                </div>

                <div className="flex flex-row justify-start items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <div className="flex flex-col justify-center gap-0">
                    <p className="text-sm font-medium dark:text-white">$12345678</p>
                    <p className="text-sm text-gray-500">Amount Made</p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 dark:border-gray-900"></div>

              <div className="flex flex-row items-center justify-between">

                <p className="text-sm text-gray-500">Received: {claim.dateReceived?.split("T")[0]}</p>

                <div className="flex flex-row justify-center items-center gap-2">

                  <div className="flex flex-row justify-center items-center border border-gray-300 rounded-md px-4 py-1 gap-2 hover:bg-gray-200 cursor-pointer dark:border-gray-800 dark:hover:bg-slate-900">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4.5 dark:text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <p className="font-semibold dark:text-white">View</p>
                  </div>

                  <div className="border border-gray-300 hover:bg-gray-200 dark:border-gray-800 p-2 rounded-md dark:hover:bg-slate-900 cursor-pointer">
                    {icon2}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
