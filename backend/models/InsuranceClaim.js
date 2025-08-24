import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: String,
    address: String,
    phone: Number,
    email: String
}, { _id: false });

const insuranceClaimSchema = new mongoose.Schema({
    lcmRef: { type: String, required: true, unique: true },
    claimNo: { type: String, required: true },
    lossType: {
        type: String,
        enum: [
            "Escape of Liquid",
            "Accidental Damage",
            "Impact Damage",
            "Storm",
            "Flood",
            "Hail",
            "Earthquake",
            "Burglary",
            "Malicious Damage",
            "Fire",
            "Lightning",
            "Fusion",
            "Machinery Breakdown"
        ],
        required: true
    },
    assessmentType: {
        type: String,
        enum: ["On-Site", "Desktop"],
        required: true
    },
    status: { type: String, enum: ["Active", "Closed", "Pending"], default: "Active" },
    dateOfLoss: Date,
    dateReceived: Date,
    acknowledgmentSentDate: Date,
    firstContactDate: Date,
    assessDate: Date,
    firstReportSentDate: Date,
    insurerUpdateDate: Date,
    currentPHContactDate: Date,
    inceptionDate: Date,
    dueDate: Date,
    reserveAmount: Number,
    crimeReportNumber: Number,
    description: String,

    insured: contactSchema,
    broker: contactSchema,
    insurer: contactSchema,

    abn: Number,
    itce: Number,
    policyType: String,
    policyNo: String,
    hours: Number,
    hoursRate: Number,
    professionalFeesHrs: Number,
    professionalFeesFlat: Number,
    seniorAdjuster: Number,
    mileageKms: Number,
    mileageRate: Number,
    feeEstimate: Number,
    actualFeeExGST: Number,
    catFee: Number,
    claimManagement: Number,
    parking: Number,
    subcontractorFee: Number,
    policeFireReport: Number,
    miscellaneous: Number,
    travelTime: Number,
    travelCost: Number,
    sharedFee: Number
}, { timestamps: true });

export default mongoose.model("InsuranceClaim", insuranceClaimSchema);
