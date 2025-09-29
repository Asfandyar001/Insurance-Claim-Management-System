import { useState } from "react";

export default function ViewDetails({ open, onClose, claimInfo }) {
    const [activeTab, setActiveTab] = useState("Summary");

    if (!claimInfo) return null;

    const tabs = ["Summary", "Parties", "Timeline", "Invoicing", "TimeStamps"];

    return (
        <div className={`fixed inset-0 z-50 flex justify-center items-center transition-colors duration-200 ${open ? "visible bg-black/50" : "invisible"}`}>
            <div onClick={(e) => e.stopPropagation()} className={`relative bg-white rounded-xl shadow p-6 w-6xl h-160 transition-all duration-200 dark:bg-slate-950 dark:border dark:border-gray-600 ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`} >
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-2 right-4 p-1 rounded-lg text-gray-400 hover:text-black cursor-pointer dark:hover:text-white" >✕</button>

                {/* Top Heading */}
                <div className="flex flex-row items-center justify-between">
                    <div>
                        <h1 className="text-lg font-semibold dark:text-white">
                            Claim Details
                        </h1>
                        <p className="text-sm text-gray-500">
                            <span>Claim #{claimInfo.claimNo}</span>{" "}
                            <span className="font-extrabold">·</span>{" "}
                            <span>LCM Ref: {claimInfo.lcmRef}</span>
                        </p>
                    </div>

                    {/* Active Status */}
                    <div className="flex items-center justify-center border rounded-4xl h-5.5 border-green-600 px-2.5 bg-green-100 dark:bg-[#169D48]/15 dark:border-[#169D48]/15 mt-3">
                        <p className="text-xs text-green-600 dark:text-[#169D48] font-medium">
                            Active
                        </p>
                    </div>
                </div>

                {/* Navigation + Content */}
                <div className="flex flex-col h-[calc(100%-4rem)]">
                    {/* Navigation Tabs */}
                    <div className="mt-3 bg-gray-100 dark:bg-slate-800 h-11 rounded grid grid-cols-5 gap-1 p-1 mb-5">
                        {tabs.map((tab) => (
                            <div key={tab} onClick={() => setActiveTab(tab)} className={`rounded font-medium text-sm flex items-center justify-center cursor-pointer transition-colors duration-150 ${activeTab === tab ? "bg-white dark:bg-slate-950 dark:text-white text-black" : "text-zinc-500 dark:text-slate-400"}`} >
                                {tab}
                            </div>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="flex-1 overflow-auto">
                        {/* Summary Tab */}
                        {activeTab === "Summary" && (
                            <div className="grid grid-cols-2 grid-rows-[1fr_auto] gap-6 h-full">

                                {/* Claim Information */}
                                <div className="border rounded-xl border-gray-500/30 p-4 overflow-y-auto">
                                    {/* Heading */}
                                    <div className="flex flex-row justify-start items-center gap-2 dark:text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                        </svg>
                                        <p className="text-2xl font-medium">Claim Information</p>
                                    </div>

                                    {/* Basic Summary in Grid */}
                                    <div className="grid grid-cols-2 mt-5 gap-4">
                                        <div className="flex flex-col justify-center items-start text-sm font-medium">
                                            <p className="text-zinc-500 dark:text-slate-400">Loss Type:</p>
                                            <p className="dark:text-white">{claimInfo.lossType}</p>
                                        </div>
                                        <div className="flex flex-col justify-center items-start text-sm font-medium">
                                            <p className="text-zinc-500 dark:text-slate-400">Assessment Type:</p>
                                            <p className="dark:text-white">{claimInfo.assessmentType}</p>
                                        </div>
                                        <div className="flex flex-col justify-center items-start text-sm font-medium">
                                            <p className="text-zinc-500 dark:text-slate-400">Date of Loss:</p>
                                            <p className="dark:text-white">{claimInfo.dateOfLoss && claimInfo.dateOfLoss !== "" ? claimInfo.dateOfLoss.split("T")[0] : "Not Specified"} </p>
                                        </div>
                                        <div className="flex flex-col justify-center items-start text-sm font-medium">
                                            <p className="text-zinc-500 dark:text-slate-400">Date Received:</p>
                                            <p className="dark:text-white">{claimInfo.dateReceived && claimInfo.dateReceived !== "" ? claimInfo.dateReceived.split("T")[0] : "Not Specified"} </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Insured Details */}
                                <div className="border rounded-xl border-gray-500/30 p-4 overflow-y-auto">
                                    {/* Heading */}
                                    <div className="flex flex-row justify-start items-center gap-2 dark:text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                        </svg>
                                        <p className="text-2xl font-medium">Insured Details</p>
                                    </div>

                                    {/* Basic Insured Details in Grid */}
                                    <div className="grid grid-cols-1 mt-5 gap-4">
                                        <div className="flex flex-col justify-center items-start text-sm font-medium">
                                            <p className="text-zinc-500 dark:text-slate-400">Name:</p>
                                            <p className="dark:text-white">{claimInfo.insured.name}</p>
                                        </div>
                                        <div className="flex flex-col justify-center items-start text-sm">
                                            <p className="text-zinc-500 dark:text-slate-400 font-medium">Address:</p>
                                            <p className="dark:text-white">{claimInfo.insured.address && claimInfo.insured.address !== "" ? claimInfo.insured.address : "Not Specified"} </p>
                                        </div>
                                        <div className="flex flex-row justify-start items-center text-sm gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-zinc-500 dark:text-slate-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                            </svg>
                                            <p className="dark:text-white">{claimInfo.insured.phone && claimInfo.insured.phone !== "" ? claimInfo.insured.phone : "Not Specified"} </p>
                                        </div>
                                        <div className="flex flex-row justify-start items-center text-sm gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-zinc-500 dark:text-slate-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                            </svg>
                                            <p className="dark:text-white">{claimInfo.insured.email && claimInfo.insured.email !== "" ? claimInfo.insured.email : "Not Specified"} </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Description Details */}
                                <div className="border rounded-xl border-gray-500/30 p-4 col-span-2 h-36 overflow-y-auto">
                                    <p className="text-2xl font-medium dark:text-white">Description</p>
                                    <p className="dark:text-white mt-3 text-sm">{claimInfo.description && claimInfo.description !== "" ? claimInfo.description : "Not Specified"} </p>
                                </div>
                            </div>
                        )}
                        {activeTab === "Parties" && (
                            <div className="grid grid-cols-2 grid-rows-[1fr_auto] gap-6 h-full">

                                {/* Broker Details */}
                                <div className="border rounded-xl border-gray-500/30 p-4 overflow-y-auto">
                                    {/* Heading */}
                                    <div className="flex flex-row justify-start items-center gap-2 dark:text-white">
                                        <p className="text-2xl font-medium">Broker Information</p>
                                    </div>

                                    {/* Basic Broker Details in Grid */}
                                    <div className="grid grid-cols-1 mt-5 gap-4">
                                        <div className="flex flex-col justify-center items-start text-sm font-medium">
                                            <p className="text-zinc-500 dark:text-slate-400">Name:</p>
                                            <p className="dark:text-white">{claimInfo.broker.name && claimInfo.broker.name !== "" ? claimInfo.broker.name : "Not Specified"} </p>
                                        </div>
                                        <div className="flex flex-col justify-center items-start text-sm">
                                            <p className="text-zinc-500 dark:text-slate-400 font-medium">Address:</p>
                                            <p className="dark:text-white">{claimInfo.broker.address && claimInfo.broker.address !== "" ? claimInfo.broker.address : "Not Specified"} </p>
                                        </div>
                                        <div className="flex flex-row justify-start items-center text-sm gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-zinc-500 dark:text-slate-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                            </svg>
                                            <p className="dark:text-white">{claimInfo.broker.phone && claimInfo.broker.phone !== "" ? claimInfo.broker.phone : "Not Specified"} </p>
                                        </div>
                                        <div className="flex flex-row justify-start items-center text-sm gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-zinc-500 dark:text-slate-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                            </svg>
                                            <p className="dark:text-white">{claimInfo.broker.email && claimInfo.broker.email !== "" ? claimInfo.broker.email : "Not Specified"} </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Insurer Details */}
                                <div className="border rounded-xl border-gray-500/30 p-4 overflow-y-auto">
                                    {/* Heading */}
                                    <div className="flex flex-row justify-start items-center gap-2 dark:text-white">
                                        <p className="text-2xl font-medium">Insurer Details</p>
                                    </div>

                                    {/* Basic Insurer Details in Grid */}
                                    <div className="grid grid-cols-1 mt-5 gap-4">
                                        <div className="flex flex-col justify-center items-start text-sm font-medium">
                                            <p className="text-zinc-500 dark:text-slate-400">Name:</p>
                                            <p className="dark:text-white">{claimInfo.insurer.name && claimInfo.insurer.name !== "" ? claimInfo.insurer.name : "Not Specified"} </p>
                                        </div>
                                        <div className="flex flex-col justify-center items-start text-sm">
                                            <p className="text-zinc-500 dark:text-slate-400 font-medium">Address:</p>
                                            <p className="dark:text-white">{claimInfo.insurer.address && claimInfo.insurer.address !== "" ? claimInfo.insurer.address : "Not Specified"} </p>
                                        </div>
                                        <div className="flex flex-row justify-start items-center text-sm gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-zinc-500 dark:text-slate-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                            </svg>
                                            <p className="dark:text-white">{claimInfo.insurer.phone && claimInfo.insurer.phone !== "" ? claimInfo.insurer.phone : "Not Specified"} </p>
                                        </div>
                                        <div className="flex flex-row justify-start items-center text-sm gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-zinc-500 dark:text-slate-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                            </svg>
                                            <p className="dark:text-white">{claimInfo.insurer.email && claimInfo.insurer.email !== "" ? claimInfo.insurer.email : "Not Specified"} </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Policy Information */}
                                <div className="border rounded-xl border-gray-500/30 p-4 col-span-2 h-36 overflow-y-auto">
                                    <p className="text-2xl font-medium dark:text-white">Policy Information</p>

                                    <div className="grid grid-cols-4 mt-5">
                                        <div className="flex flex-col justify-center items-start text-sm font-medium">
                                            <p className="text-zinc-500 dark:text-slate-400">Policy Type:</p>
                                            <p className="dark:text-white">{claimInfo.policyType && claimInfo.policyType !== "" ? claimInfo.policyType : "Not Specified"} </p>
                                        </div>
                                        <div className="flex flex-col justify-center items-start text-sm font-medium">
                                            <p className="text-zinc-500 dark:text-slate-400">Policy No:</p>
                                            <p className="dark:text-white">{claimInfo.policyNo && claimInfo.policyNo !== "" ? claimInfo.policyNo : "Not Specified"}</p>
                                        </div>
                                        <div className="flex flex-col justify-center items-start text-sm font-medium">
                                            <p className="text-zinc-500 dark:text-slate-400">Inception Date:</p>
                                            <p className="dark:text-white">{claimInfo.inceptionDate?.split("T")[0] && claimInfo.inceptionDate?.split("T")[0] !== "" ? claimInfo.inceptionDate?.split("T")[0] : "Not Specified"}</p>
                                        </div>
                                        <div className="flex flex-col justify-center items-start text-sm font-medium">
                                            <p className="text-zinc-500 dark:text-slate-400">Due Date:</p>
                                            <p className="dark:text-white">{claimInfo.dueDate?.split("T")[0] && claimInfo.dueDate?.split("T")[0] !== "" ? claimInfo.dueDate?.split("T")[0] : "Not Specified"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === "Timeline" && <p className="dark:text-white">🗓️ Timeline of the claim.</p>}
                        {activeTab === "Invoicing" && <p className="dark:text-white">💰 Invoicing details shown here.</p>}
                        {activeTab === "TimeStamps" && (
                            <p className="dark:text-white">⏱️ Timestamps and logs will appear here.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
