import { useState, useEffect } from "react";
import { useToast } from "../hooks/use-toast";
import axios from 'axios';

// A reusable input component for cleaner JSX
const EditInput = ({ label, name, value, onChange, type = "text", placeholder = "" }) => (
    <div className="flex flex-col text-sm">
        <label className="text-zinc-500 dark:text-slate-400 font-medium mb-1">{label}</label>
        <input
            type={type}
            name={name}
            value={value || ''}
            onChange={onChange}
            placeholder={placeholder}
            className="p-2 bg-slate-100 dark:bg-slate-800 rounded-md dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
);

const EditSelect = ({ label, name, value, onChange, options }) => (
    <div className="flex flex-col text-sm">
        <label className="text-zinc-500 dark:text-slate-400 font-medium mb-1">{label}</label>
        <select
            name={name}
            value={value || ''}
            onChange={onChange}
            className="p-2 bg-slate-100 dark:bg-slate-800 rounded-md dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value="" disabled>-- Select an option --</option>
            {options.map(option => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
);

export default function EditClaims({ open, onClose, claimInfo, refresh, status }) {
    const [activeTab, setActiveTab] = useState("Basic Info");
    const [formData, setFormData] = useState(null);
    const statusOptions = ["Active", "Closed"];
    const lossTypeOptions = [
        "Escape of Liquid", "Accidental Damage", "Impact Damage", "Storm", "Flood",
        "Hail", "Earthquake", "Burglary", "Malicious Damage", "Fire", "Lightning",
        "Fusion", "Machinery Breakdown"
    ];
    const assessmentTypeOptions = ["On-Site", "Desktop"];
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [closingAction, setClosingAction] = useState(null);


    // Initialize formData state when claimInfo prop is available or changes
    useEffect(() => {
        if (claimInfo) {
            // Create a deep copy to avoid mutating the original prop object
            setFormData(JSON.parse(JSON.stringify(claimInfo)));
        }
    }, [claimInfo]);

    // Handler to update state on input change, supports nested objects
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const keys = name.split('.');
        const val = type === 'checkbox' ? checked : value;

        setIsDirty(true);

        if (keys.length > 1) {
            setFormData(prev => {
                const newFormData = { ...prev };
                let current = newFormData;
                for (let i = 0; i < keys.length - 1; i++) {
                    current = current[keys[i]];
                }
                current[keys[keys.length - 1]] = val;
                return newFormData;
            });
        } else {
            setFormData(prev => ({ ...prev, [name]: val }));
        }
    };

    // Handler for submitting the form data
    const handleSubmit = async () => {
        if (!formData.insured?.name || formData.insured.name.trim() === "") {
            toast({
                title: "Insured Name cannot be empty",
                variant: "destructive",
            });
            return; // Stop the function
        }
        try {
            setLoading(true);
            // Replace with your actual API endpoint. Assuming you pass claim ID in the URL.
            await axios.put(`/api/claims/${formData._id}`, formData);
            toast({
                title: "Claim has been updated successfully",
                variant: "success"
            });
            if (refresh) refresh(); // Refresh the data in the parent component
            onClose(); // Close the modal
        } catch (error) {
            console.log(error)
            toast({
                title: "Could not update the claim",
                variant: "destructive",
            });
        } finally {
            setLoading(false); // stop loading
        }
    };

    if (!formData) {
        return null;
    }

    const tabs = ["Basic Info", "Parties", "Timeline", "Invoicing"];

    // Helper to format date values for date inputs
    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        return dateString.split("T")[0];
    };

    return (
        <div className={`fixed inset-0 z-50 flex justify-center items-center transition-colors duration-200 ${open ? "visible bg-black/50" : "invisible"}`}>
            <div onClick={(e) => e.stopPropagation()} className={`relative bg-white rounded-xl shadow p-6 w-6xl h-[90vh] max-h-[700px] transition-all duration-200 dark:bg-slate-950 dark:border dark:border-gray-600 ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`} >
                {/* Close Button */}
                <button
                    onClick={() => {
                        if (isDirty) setShowConfirmDialog(true);
                        else onClose();
                    }}
                    className="absolute top-2 right-4 p-1 rounded-lg text-gray-400 hover:text-black cursor-pointer dark:hover:text-white"
                >
                    ✕
                </button>


                {/* Top Heading */}
                <div className="flex flex-row items-center justify-between">
                    <div>
                        <h1 className="text-lg font-semibold dark:text-white">
                            Edit Claim
                        </h1>
                        <p className="text-sm text-gray-500">
                            <span>Claim #{formData.claimNo}</span>{" "}
                            <span className="font-extrabold">·</span>{" "}
                            <span>LCM Ref: {formData.lcmRef}</span>
                        </p>
                    </div>
                    {status && (
                        status === 'active' ? (
                            <div className="flex items-center justify-center border rounded-full h-6 border-green-600 px-2.5 bg-green-100 dark:bg-[#169D48]/15 dark:border-[#169D48]/15">
                                <p className="text-xs text-green-600 dark:text-[#169D48] font-medium">Active</p>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center border rounded-full h-6 border-red-600 px-2.5 bg-red-100 dark:bg-[#9d1616]/15 dark:border-[#9d1616]/15">
                                <p className="text-xs text-red-600 dark:text-[#9d1616] font-medium">Closed</p>
                            </div>
                        )
                    )}
                </div>

                {/* Navigation + Content */}
                <div className="flex flex-col h-[calc(100%-6rem)]">
                    {/* Navigation Tabs */}
                    <div className="mt-3 bg-gray-100 dark:bg-slate-800 h-11 rounded grid grid-cols-4 gap-1 p-1 mb-5">
                        {tabs.map((tab) => (
                            <div key={tab} onClick={() => setActiveTab(tab)} className={`rounded font-medium text-sm flex items-center justify-center cursor-pointer transition-colors duration-150 ${activeTab === tab ? "bg-white dark:bg-slate-950 dark:text-white text-black" : "text-zinc-500 dark:text-slate-400"}`} >
                                {tab}
                            </div>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="flex-1 overflow-auto pr-2 pb-2">
                        {/* Basic Info Tab */}
                        {activeTab === "Basic Info" && (
                            <div className="grid grid-cols-2 gap-6 h-full">
                                {/* Claim Details */}
                                <div className="border rounded-xl border-gray-500/30 p-4">
                                    <div className="flex flex-row justify-start items-center gap-2 dark:text-white mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
                                        <p className="text-xl font-medium">Claim Details</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <EditSelect label="Status" name="status" value={formData.status} onChange={handleChange} options={statusOptions} />
                                        <EditSelect label="Loss Type" name="lossType" value={formData.lossType} onChange={handleChange} options={lossTypeOptions} />
                                        <EditSelect label="Assessment Type" name="assessmentType" value={formData.assessmentType} onChange={handleChange} options={assessmentTypeOptions} />
                                        <EditInput placeholder="Enter crime report number" label="Crime Report Number" name="crimeReportNumber" value={formData.crimeReportNumber} onChange={handleChange} type="number" />
                                        <EditInput label="Date of Loss" name="dateOfLoss" value={formatDateForInput(formData.dateOfLoss)} onChange={handleChange} type="date" />
                                        <EditInput label="Date Received" name="dateReceived" value={formatDateForInput(formData.dateReceived)} onChange={handleChange} type="date" />
                                    </div>
                                </div>
                                {/* Insured Details */}
                                <div className="border rounded-xl border-gray-500/30 p-4">
                                    <div className="flex flex-row justify-start items-center gap-2 dark:text-white mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
                                        <p className="text-xl font-medium">Insured Information</p>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                        <EditInput placeholder="Enter name" label="Insured Name *" name="insured.name" value={formData.insured.name} onChange={handleChange} required={true} />
                                        <EditInput placeholder="Enter address" label="Address" name="insured.address" value={formData.insured.address} onChange={handleChange} />
                                        <div className="grid grid-cols-2 gap-4">
                                            <EditInput placeholder="Phone number" label="Phone" name="insured.phone" value={formData.insured.phone} onChange={handleChange} type="number" />
                                            <EditInput placeholder="Email address" label="Email" name="insured.email" value={formData.insured.email} onChange={handleChange} type="email" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <EditInput placeholder="Enter ABN" label="ABN" name="abn" value={formData.abn} onChange={handleChange} type="number" />
                                            <EditInput placeholder="Enter ITCE" label="ITCE" name="itce" value={formData.itce} onChange={handleChange} type="number" />
                                        </div>
                                    </div>
                                </div>
                                {/* Description */}
                                <div className="border rounded-xl border-gray-500/30 p-4 col-span-2">
                                    <label className="text-xl font-medium dark:text-white mb-2 block">Description</label>
                                    <textarea placeholder="Enter claim description..." name="description" value={formData.description || ''} onChange={handleChange} rows="4" className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-md dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                                </div>
                            </div>
                        )}
                        {/* Parties Tab */}
                        {activeTab === "Parties" && (
                            <div className="grid grid-cols-2 gap-6 h-full">
                                {/* Broker Details */}
                                <div className="border rounded-xl border-gray-500/30 p-4">
                                    <p className="text-xl font-medium dark:text-white mb-4">Broker Information</p>
                                    <div className="grid grid-cols-1 gap-4">
                                        <EditInput placeholder="Broker company name" label="Broker Name" name="broker.name" value={formData.broker.name} onChange={handleChange} />
                                        <EditInput placeholder="Broker address" label="Address" name="broker.address" value={formData.broker.address} onChange={handleChange} />
                                        <div className="grid grid-cols-2 gap-4">
                                            <EditInput placeholder="Broker phone" label="Phone" name="broker.phone" value={formData.broker.phone} onChange={handleChange} type="number" />
                                            <EditInput placeholder="Broker email" label="Email" name="broker.email" value={formData.broker.email} onChange={handleChange} type="email" />
                                        </div>
                                    </div>
                                </div>
                                {/* Insurer Details */}
                                <div className="border rounded-xl border-gray-500/30 p-4">
                                    <p className="text-xl font-medium dark:text-white mb-4">Insurer Information</p>
                                    <div className="grid grid-cols-1 gap-4">
                                        <EditInput placeholder="Insurance company name" label="Insurer Name" name="insurer.name" value={formData.insurer.name} onChange={handleChange} required={true} />
                                        <EditInput placeholder="Insurer address" label="Address" name="insurer.address" value={formData.insurer.address} onChange={handleChange} />
                                        <div className="grid grid-cols-2 gap-4">
                                            <EditInput placeholder="Insurer phone" label="Phone" name="insurer.phone" value={formData.insurer.phone} onChange={handleChange} type="number" />
                                            <EditInput placeholder="Insurer email" label="Email" name="insurer.email" value={formData.insurer.email} onChange={handleChange} type="email" />
                                        </div>
                                    </div>
                                </div>
                                {/* Policy Information */}
                                <div className="border rounded-xl border-gray-500/30 p-4 col-span-2">
                                    <p className="text-xl font-medium dark:text-white mb-4">Policy Information</p>
                                    <div className="grid grid-cols-4 gap-4">
                                        <EditInput placeholder="Policy Type" label="Policy Type" name="policyType" value={formData.policyType} onChange={handleChange} />
                                        <EditInput placeholder="Policy Number" label="Policy No" name="policyNo" value={formData.policyNo} onChange={handleChange} />
                                        <EditInput label="Inception Date" name="inceptionDate" value={formatDateForInput(formData.inceptionDate)} onChange={handleChange} type="date" />
                                        <EditInput label="Due Date" name="dueDate" value={formatDateForInput(formData.dueDate)} onChange={handleChange} type="date" />
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Timeline Tab */}
                        {activeTab === "Timeline" && (
                            <div className="border rounded-xl border-gray-500/30 p-4 h-full">
                                <div className="mb-6">
                                    <h1 className="text-2xl font-medium dark:text-white">Compliance & Timeline</h1>
                                    <p className="text-sm text-gray-500">Important dates and compliance milestones</p>
                                </div>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                    <EditInput label="Acknowledgment Sent" name="acknowledgmentSentDate" value={formatDateForInput(formData.acknowledgmentSentDate)} onChange={handleChange} type="date" />
                                    <EditInput label="First Report Sent" name="firstReportSentDate" value={formatDateForInput(formData.firstReportSentDate)} onChange={handleChange} type="date" />
                                    <EditInput label="First Contact Date" name="firstContactDate" value={formatDateForInput(formData.firstContactDate)} onChange={handleChange} type="date" />
                                    <EditInput label="Insurer Update" name="insurerUpdateDate" value={formatDateForInput(formData.insurerUpdateDate)} onChange={handleChange} type="date" />
                                    <EditInput label="Assessment Date" name="assessDate" value={formatDateForInput(formData.assessDate)} onChange={handleChange} type="date" />
                                    <EditInput label="Current PH Contact" name="currentPHContactDate" value={formatDateForInput(formData.currentPHContactDate)} onChange={handleChange} type="date" />
                                </div>
                            </div>
                        )}
                        {/* Invoicing Tab */}
                        {activeTab === "Invoicing" && (
                            <div className="border rounded-xl border-gray-500/30 p-4 h-full overflow-auto">
                                <div className="flex flex-row justify-start items-center dark:text-white text-2xl font-medium gap-4 mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" /></svg>
                                    <h1>Billing Information</h1>
                                </div>
                                <div className="grid grid-cols-3 gap-x-6 gap-y-4">
                                    <EditInput label="Hours" name="hours" value={formData.hours} onChange={handleChange} type="number" placeholder="0" />
                                    <EditInput label="Hourly Rate ($)" name="hoursRate" value={formData.hoursRate} onChange={handleChange} type="number" placeholder="0.00" />
                                    <EditInput label="Professional Fees (hrs) ($)" name="professionalFeesHrs" value={formData.professionalFeesHrs} onChange={handleChange} type="number" placeholder="0.00" />
                                    <EditInput label="Professional Fees (Flat) ($)" name="professionalFeesFlat" value={formData.professionalFeesFlat} onChange={handleChange} type="number" placeholder="0.00" />
                                    <EditInput label="Mileage (Kms)" name="mileageKms" value={formData.mileageKms} onChange={handleChange} type="number" placeholder="0" />
                                    <EditInput label="Mileage Rate ($)" name="mileageRate" value={formData.mileageRate} onChange={handleChange} type="number" placeholder="0.00" />
                                    <EditInput label="Fee Estimate ($)" name="feeEstimate" value={formData.feeEstimate} onChange={handleChange} type="number" placeholder="0.00" />
                                    <EditInput label="Actual Fee (Ex GST) ($)" name="actualFeeExGST" value={formData.actualFeeExGST} onChange={handleChange} type="number" placeholder="0.00" />
                                    <EditInput label="Reserve Amount ($)" name="reserveAmount" value={formData.reserveAmount} onChange={handleChange} type="number" placeholder="0.00" />
                                    <EditInput label="Senior Adjuster ($)" name="seniorAdjuster" value={formData.seniorAdjuster} onChange={handleChange} type="number" placeholder="0.00" />
                                    <EditInput label="CAT Fee ($)" name="catFee" value={formData.catFee} onChange={handleChange} type="number" placeholder="0.00" />
                                    <EditInput label="Claim Management ($)" name="claimManagement" value={formData.claimManagement} onChange={handleChange} type="number" placeholder="0.00" />
                                    <EditInput label="Parking ($)" name="parking" value={formData.parking} onChange={handleChange} type="number" placeholder="0.00" />
                                    <EditInput label="Sub-contractor Fee ($)" name="subcontractorFee" value={formData.subcontractorFee} onChange={handleChange} type="number" placeholder="0.00" />
                                    <EditInput label="Police / Fire Report" name="policeFireReport" value={formData.policeFireReport} onChange={handleChange} type="number" placeholder="0.00" />
                                    <EditInput label="Miscellaneous" name="miscellaneous" value={formData.miscellaneous} onChange={handleChange} type="number" placeholder="0.00" />
                                    <EditInput label="Travel Time" name="travelTime" value={formData.travelTime} onChange={handleChange} type="number" placeholder="0.00" />
                                    <EditInput label="Travel Cost" name="travelCost" value={formData.travelCost} onChange={handleChange} type="number" placeholder="0.00" />
                                    <EditInput label="Shared Fee" name="sharedFee" value={formData.sharedFee} onChange={handleChange} type="number" placeholder="0.00" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Modal Footer with Action Buttons */}
                <div className="flex justify-end items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => {
                            if (isDirty) setShowConfirmDialog(true);
                            else onClose();
                        }}
                        className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-slate-800 rounded-md hover:bg-gray-200 dark:hover:bg-slate-700 transition cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`ml-3 px-4 py-2 text-sm font-medium text-white rounded-md transition 
        ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 cursor-pointer"}`}
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>

                </div>
            </div>
            {showConfirmDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl p-6 w-[400px] text-center">
                        <h2 className="text-lg font-semibold mb-3 dark:text-white">
                            Unsaved Changes
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            You have unsaved changes. Do you want to save them before closing?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => {
                                    setShowConfirmDialog(false);
                                    onClose(); // discard changes
                                }}
                                className="cursor-pointer px-4 py-2 bg-gray-200 dark:bg-slate-800 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-700"
                            >
                                No
                            </button>
                            <button
                                onClick={async () => {
                                    setClosingAction("saving");
                                    await handleSubmit();
                                    setClosingAction(null);
                                    setShowConfirmDialog(false);
                                }}
                                disabled={closingAction === "saving"}
                                className={`px-4 py-2 rounded-md text-white transition ${closingAction === "saving"
                                        ? "bg-blue-400 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                                    }`}
                            >
                                {closingAction === "saving" ? "Saving..." : "Yes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}