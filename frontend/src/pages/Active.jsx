import { useState, useEffect } from "react";
import CustomSelect from "../components/CustomeSelect";
import axios from 'axios';


export default function Active() {
  const filter1 = ["Due Next", "Date of Loss", "Amount Made"];
  const icon1 = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 dark:text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
  </svg>;

  const filter2 = ["Ascending", "Descending"];

  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const res = await axios.get("/api/claims");
        setClaims(res.data);
        console.log("Response:", res.data);
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
          />
        </div>


        {/* Custom select */}
        <div className="flex flex-row gap-2">
          <CustomSelect
            options={filter1}
            onChange={(value) => console.log("Selected:", value)}
            icon={icon1}
            width="w-44"
          />
          <CustomSelect
            options={filter2}
            onChange={(value) => console.log("Selected:", value)}
            icon={""}
            width="w-33"
          />
        </div>

      </div>
    </div>
  );
}
