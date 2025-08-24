import { useEffect, useState } from "react";
import { useToast } from "../hooks/use-toast";
import axios from "axios";

export default function AddClaim({ open, onClose, onSubmit }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1: Claim Summary
        lcmRef: "",
        claimNo: "",
        lossType: "",
        assessmentType: "",
        status: "Active",
        dateOfLoss: "",
        dateReceived: "",
        reserveAmount: "",
        crimeReportNumber: "",

        // Step 2: Compliance & Timeline
        acknowledgmentSentDate: "",
        firstContactDate: "",
        assessDate: "",
        firstReportSentDate: "",
        insurerUpdateDate: "",
        currentPHContactDate: "",

        // Step 3: Insured Details
        insuredName: "",
        insuredAddress: "",
        insuredPhone: "",
        insuredEmail: "",
        abn: "",
        itce: "",

        // Step 4: Policy Information
        policyType: "",
        policyNo: "",
        inceptionDate: "",
        dueDate: "",

        // Step 5: Broker Info
        brokerName: "",
        brokerPhone: "",
        brokerEmail: "",
        brokerAddress: "",

        // Step 6: Insurer Info
        insurerName: "",
        insurerPhone: "",
        insurerEmail: "",
        insurerAddress: "",

        // Step 7: Invoicing
        hours: "",
        hoursRate: "",
        professionalFeesHrs: "",
        professionalFeesFlat: "",
        seniorAdjuster: "",
        mileageKms: "",
        mileageRate: "",
        feeEstimate: "",
        actualFeeExGST: "",
        catFee: "",
        claimManagement: "",
        parking: "",
        subcontractorFee: "",
        policeFireReport: "",
        miscellaneous: "",
        travelTime: "",
        travelCost: "",
        sharedFee: "",

        // Step 8: Description
        description: ""
    });

    const FORM_STEPS = [
        { id: 1, title: "Claim Summary", description: "Basic claim information" },
        { id: 2, title: "Compliance & Timeline", description: "Important dates and compliance" },
        { id: 3, title: "Insured Details", description: "Policyholder information" },
        { id: 4, title: "Policy Information", description: "Policy details and coverage" },
        { id: 5, title: "Broker Info", description: "Broker contact information" },
        { id: 6, title: "Insurer Info", description: "Insurance company details" },
        { id: 7, title: "Invoicing", description: "Billing and fee information" },
        { id: 8, title: "Description", description: "Additional details and notes" }
    ];

    const { toast } = useToast();

    useEffect(() => {
        setCurrentStep(1);
        setFormData({
            lcmRef: "",
            claimNo: "",
            lossType: "",
            assessmentType: "",
            status: "Active",
            dateOfLoss: "",
            dateReceived: "",
            reserveAmount: "",
            crimeReportNumber: "",
            acknowledgmentSentDate: "",
            firstContactDate: "",
            assessDate: "",
            firstReportSentDate: "",
            insurerUpdateDate: "",
            currentPHContactDate: "",
            insuredName: "",
            insuredAddress: "",
            insuredPhone: "",
            insuredEmail: "",
            abn: "",
            itce: "",
            policyType: "",
            policyNo: "",
            inceptionDate: "",
            dueDate: "",
            brokerName: "",
            brokerPhone: "",
            brokerEmail: "",
            brokerAddress: "",
            insurerName: "",
            insurerPhone: "",
            insurerEmail: "",
            insurerAddress: "",
            hours: "",
            hoursRate: "",
            professionalFeesHrs: "",
            professionalFeesFlat: "",
            seniorAdjuster: "",
            mileageKms: "",
            mileageRate: "",
            feeEstimate: "",
            actualFeeExGST: "",
            catFee: "",
            claimManagement: "",
            parking: "",
            subcontractorFee: "",
            policeFireReport: "",
            miscellaneous: "",
            travelTime: "",
            travelCost: "",
            sharedFee: "",
            description: ""
        });
    }, [open]);

    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const validateCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return formData.lcmRef && formData.claimNo && formData.lossType && formData.assessmentType;
            case 3:
                return formData.insuredName;
            default:
                return true;
        }
    };

    const handleNext = () => {
        console.log(formData)
        if (!validateCurrentStep()) {
            toast({
                title: "Fill out all required fields.",
                variant: "destructive",
            });
            return;
        }

        if (currentStep < FORM_STEPS.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async () => {
        if (!validateCurrentStep()) {
            toast({
                title: "Fill out all required fields.",
                variant: "destructive",
            });
            return;
        }
        try {
            const payload = {
                ...formData,
                daysOpen: 0
            };

            const response = await axios.post("http://localhost:5000/api/claims", payload);

            toast({
                title: "Claim Added Successfully",
                variant: "success",
            });

            onSubmit({
                ...formData,
                id: Date.now().toString(),
                daysOpen: 0
            });

            onClose();
        } catch (error) {
            toast({
                title: "Failed to add claim",
                variant: "destructive",
            });
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="mt-5 grid grid-cols-2 gap-5">
                        <div>
                            <p className="text-sm font-medium">LCM Ref *</p>
                            <input type="text" value={formData.lcmRef} onChange={(e) => updateFormData("lcmRef", e.target.value)} placeholder="Enter LCM reference" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Claim No. *</p>
                            <input type="text" value={formData.claimNo} onChange={(e) => updateFormData("claimNo", e.target.value)} placeholder="Enter claim number" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Loss Type *</p>
                            <select
                                value={formData.lossType}
                                onChange={(e) => updateFormData("lossType", e.target.value)}
                                className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full"
                            >
                                <option value="">Select loss type</option>
                                <option value="Escape of Liquid">Escape of Liquid</option>
                                <option value="Accidental Damage">Accidental Damage</option>
                                <option value="Impact Damage">Impact Damage</option>
                                <option value="Storm">Storm</option>
                                <option value="Flood">Flood</option>
                                <option value="Hail">Hail</option>
                                <option value="Earthquake">Earthquake</option>
                                <option value="Burglary">Burglary</option>
                                <option value="Malicious Damage">Malicious Damage</option>
                                <option value="Fire">Fire</option>
                                <option value="Lightning">Lightning</option>
                                <option value="Fusion">Fusion</option>
                                <option value="Machinery Breakdown">Machinery Breakdown</option>
                            </select>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Assessment Type *</p>
                            <select
                                value={formData.assessmentType}
                                onChange={(e) => updateFormData("assessmentType", e.target.value)}
                                className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full"
                            >
                                <option value="">Select assessment type</option>
                                <option value="On-Site">On-Site</option>
                                <option value="Desktop">Desktop</option>
                            </select>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Date of Loss</p>
                            <input type="date" value={formData.dateOfLoss} onChange={(e) => updateFormData("dateOfLoss", e.target.value)} className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Date Recieved</p>
                            <input type="date" value={formData.dateReceived} onChange={(e) => updateFormData("dateReceived", e.target.value)} className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Reserve Amount</p>
                            <input type="number" value={formData.reserveAmount} onChange={(e) => updateFormData("reserveAmount", e.target.value)} placeholder="0.00" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Crime Report Number</p>
                            <input type="number" value={formData.crimeReportNumber} onChange={(e) => updateFormData("crimeReportNumber", e.target.value)} placeholder="Enter Crime Report Number (if applicable)" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                    </div>
                )

            case 2:
                return (
                    <div className="mt-5 grid grid-cols-2 gap-5">
                        <div>
                            <p className="text-sm font-medium">Acknowledgment Sent Date</p>
                            <input type="date" value={formData.acknowledgmentSentDate} onChange={(e) => updateFormData("acknowledgmentSentDate", e.target.value)} className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">First Contact Date</p>
                            <input type="date" value={formData.firstContactDate} onChange={(e) => updateFormData("firstContactDate", e.target.value)} className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Assess Date / Site Visit Date</p>
                            <input type="date" value={formData.assessDate} onChange={(e) => updateFormData("assessDate", e.target.value)} className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">First Report Sent Date</p>
                            <input type="date" value={formData.firstReportSentDate} onChange={(e) => updateFormData("firstReportSentDate", e.target.value)} className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Insurer Update Date</p>
                            <input type="date" value={formData.insurerUpdateDate} onChange={(e) => updateFormData("insurerUpdateDate", e.target.value)} className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Current PH Contact Date</p>
                            <input type="date" value={formData.currentPHContactDate} onChange={(e) => updateFormData("currentPHContactDate", e.target.value)} className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                    </div>
                )
            case 3:
                return (
                    <div className="mt-5">
                        <div className="grid grid-cols-1 gap-5">
                            <div>
                                <p className="text-sm font-medium">Insured Name *</p>
                                <input type="text" value={formData.insuredName} onChange={(e) => updateFormData("insuredName", e.target.value)} placeholder="Enter insured person/company name" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Address</p>
                                <textarea type="text" value={formData.insuredAddress} onChange={(e) => updateFormData("insuredAddress", e.target.value)} placeholder="Enter full address" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-5">
                            <div>
                                <p className="text-sm font-medium">Phone</p>
                                <input type="number" value={formData.insuredPhone} onChange={(e) => updateFormData("insuredPhone", e.target.value)} placeholder="Phone number" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Email</p>
                                <input type="text" value={formData.insuredEmail} onChange={(e) => updateFormData("insuredEmail", e.target.value)} placeholder="Email address" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">ABN</p>
                                <input type="number" value={formData.abn} onChange={(e) => updateFormData("abn", e.target.value)} placeholder="Australian Business Number" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">ITCE</p>
                                <input type="number" value={formData.itce} onChange={(e) => updateFormData("itce", e.target.value)} placeholder="ITCE number" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                            </div>
                        </div>
                    </div>
                )
            case 4:
                return (
                    <div className="mt-5 grid grid-cols-2 gap-5">
                        <div>
                            <p className="text-sm font-medium">Policy Type</p>
                            <input type="text" value={formData.policyType} onChange={(e) => updateFormData("policyType", e.target.value)} placeholder="Enter Policy Type" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Policy No.</p>
                            <input type="text" value={formData.policyNo} onChange={(e) => updateFormData("policyNo", e.target.value)} placeholder="Policy number" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Inception Date</p>
                            <input type="date" value={formData.inceptionDate} onChange={(e) => updateFormData("inceptionDate", e.target.value)} className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Due Date</p>
                            <input type="date" value={formData.dueDate} onChange={(e) => updateFormData("dueDate", e.target.value)} className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                    </div>
                )
            case 5:
                return (
                    <div className="mt-5 grid grid-cols-2 gap-5">
                        <div className="col-span-2">
                            <p className="text-sm font-medium">Broker Name</p>
                            <input type="text" value={formData.brokerName} onChange={(e) => updateFormData("brokerName", e.target.value)} placeholder="Broker company name" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Phone</p>
                            <input type="number" value={formData.brokerPhone} onChange={(e) => updateFormData("brokerPhone", e.target.value)} placeholder="Broker phone number" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Email</p>
                            <input type="text" value={formData.brokerEmail} onChange={(e) => updateFormData("brokerEmail", e.target.value)} placeholder="Broker email address" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div className="col-span-2">
                            <p className="text-sm font-medium">Address</p>
                            <textarea type="text" value={formData.brokerAddress} onChange={(e) => updateFormData("brokerAddress", e.target.value)} placeholder="Broker full address" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                    </div>
                )
            case 6:
                return (
                    <div className="mt-5 grid grid-cols-2 gap-5">
                        <div className="col-span-2">
                            <p className="text-sm font-medium">Insurer Name</p>
                            <input type="text" value={formData.insurerName} onChange={(e) => updateFormData("insurerName", e.target.value)} placeholder="Insurer company name" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Phone</p>
                            <input type="number" value={formData.insurerPhone} onChange={(e) => updateFormData("insurerPhone", e.target.value)} placeholder="Insurer phone number" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Email</p>
                            <input type="text" value={formData.insurerEmail} onChange={(e) => updateFormData("insurerEmail", e.target.value)} placeholder="Insurer email address" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div className="col-span-2">
                            <p className="text-sm font-medium">Address</p>
                            <textarea type="text" value={formData.insurerAddress} onChange={(e) => updateFormData("insurerAddress", e.target.value)} placeholder="Insurer full address" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                    </div>
                )
            case 7:
                return (
                    <div className="mt-5 grid grid-cols-3 gap-5">
                        <div>
                            <p className="text-sm font-medium">Hours</p>
                            <input type="number" value={formData.hours} onChange={(e) => updateFormData("hours", e.target.value)} placeholder="0" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Hours Rate</p>
                            <input type="number" value={formData.hoursRate} onChange={(e) => updateFormData("hoursRate", e.target.value)} placeholder="0.00" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Professional Fees (hrs)</p>
                            <input type="number" value={formData.professionalFeesHrs} onChange={(e) => updateFormData("professionalFeesHrs", e.target.value)} placeholder="0.00" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Professional Fees (flat)</p>
                            <input type="number" value={formData.professionalFeesFlat} onChange={(e) => updateFormData("professionalFeesFlat", e.target.value)} placeholder="0.00" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Mileage (kms)</p>
                            <input type="number" value={formData.mileageKms} onChange={(e) => updateFormData("mileageKms", e.target.value)} placeholder="0" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Mileage Rate</p>
                            <input type="number" value={formData.mileageRate} onChange={(e) => updateFormData("mileageRate", e.target.value)} placeholder="0.00" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Senior Adjuster</p>
                            <input type="number" value={formData.seniorAdjuster} onChange={(e) => updateFormData("seniorAdjuster", e.target.value)} placeholder="0.00" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Fee Estimate</p>
                            <input type="number" value={formData.feeEstimate} onChange={(e) => updateFormData("feeEstimate", e.target.value)} placeholder="0.00" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Actual Fee (Ex GST)</p>
                            <input type="number" value={formData.actualFeeExGST} onChange={(e) => updateFormData("actualFeeExGST", e.target.value)} placeholder="0.00" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">CAT Fee</p>
                            <input type="number" value={formData.catFee} onChange={(e) => updateFormData("catFee", e.target.value)} placeholder="0.00" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Claim Management</p>
                            <input type="number" value={formData.claimManagement} onChange={(e) => updateFormData("claimManagement", e.target.value)} placeholder="0.00" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Parking</p>
                            <input type="number" value={formData.parking} onChange={(e) => updateFormData("parking", e.target.value)} placeholder="0.00" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Sub-contractor Fee</p>
                            <input type="number" value={formData.subcontractorFee} onChange={(e) => updateFormData("subcontractorFee", e.target.value)} placeholder="0.00" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Police / Fire Report</p>
                            <input type="number" value={formData.policeFireReport} onChange={(e) => updateFormData("policeFireReport", e.target.value)} placeholder="0.00" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Miscellaneous</p>
                            <input type="number" value={formData.miscellaneous} onChange={(e) => updateFormData("miscellaneous", e.target.value)} placeholder="0.00" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Travel Time</p>
                            <input type="number" value={formData.travelTime} onChange={(e) => updateFormData("travelTime", e.target.value)} placeholder="0.00" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Travel Cost</p>
                            <input type="number" value={formData.travelCost} onChange={(e) => updateFormData("travelCost", e.target.value)} placeholder="0.00" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Shared Fee</p>
                            <input type="number" value={formData.sharedFee} onChange={(e) => updateFormData("sharedFee", e.target.value)} placeholder="0.00" className="border-2 border-gray-400/30 rounded text-sm p-2.5 w-full" />
                        </div>
                    </div>
                )
            case 8:
                return (
                    <div className="mt-5">
                        <div>
                            <p className="text-sm font-medium">Additional Description</p>
                            <textarea type="text" value={formData.description} onChange={(e) => updateFormData("description", e.target.value)} placeholder="Enter any additional notes, details, or description about this claim..." className="border-2 border-gray-400/30 rounded h-70 text-sm p-2.5 w-full" />
                        </div>
                    </div>
                )
        }
    }

    const progress = (currentStep / FORM_STEPS.length) * 100;

    return (
        <div
            className={`fixed inset-0 z-50 flex justify-center items-center transition-colors duration-200 ${open ? "visible bg-black/50" : "invisible"
                }`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`relative bg-white rounded-xl shadow p-6 w-4xl h-11/12 transition-all duration-200 ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"
                    }`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-4 p-1 rounded-lg text-gray-400 hover:text-black cursor-pointer"
                >
                    ✕
                </button>

                {/* Header */}
                <div className="flex items-center">
                    <h2 className="text-lg font-semibold pb-4">Add New Claim </h2>
                </div>

                {/* form info */}
                <div className="flex flex-row justify-between items-center text-sm pb-2 text-gray-500">
                    <p>Step {currentStep} of {FORM_STEPS.length}</p>
                    <p>{Math.round(progress)}% Complete</p>
                </div>

                {/* Completion Bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                        className="bg-blue-500 h-4 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    >
                    </div>
                </div>

                {/* Fields Box */}
                <div className="mt-7 border rounded-md border-gray-500/30 p-4 max-h-106 overflow-auto">
                    {/* Fields Info */}
                    <div className="flex flex-col justify-center items-start">
                        <h3 className="text-lg font-semibold pb-2">{FORM_STEPS[currentStep - 1].title}</h3>
                        <p className="text-sm text-gray-500">{FORM_STEPS[currentStep - 1].description}</p>
                    </div>

                    {/* Fields */}
                    {renderStep()}

                </div>

                {/* Footer */}
                <button onClick={handlePrevious} disabled={currentStep === 1} className="absolute bottom-4 left-7 bg-white border border-gray-400/30 rounded-md py-2 px-5 flex items-center gap-2 hover:bg-gray-200 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    <p>Previous</p>
                </button>

                {currentStep === FORM_STEPS.length ? (
                    <button onClick={handleSubmit} className="absolute bottom-4 right-7 bg-green-600 border rounded-md py-2 px-5 text-white flex items-center gap-2 hover:bg-green-700 cursor-pointer">
                        Create Claim
                    </button>
                ) : (
                    <button onClick={handleNext} className="absolute bottom-4 right-7 bg-blue-600 border rounded-md py-2 px-5 text-white flex items-center gap-2 hover:bg-blue-700 cursor-pointer">
                        <p>Next</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                )}


            </div>
        </div>
    );
}
