import express from "express";
import InsuranceClaim from "../models/InsuranceClaim.js";
import { protectRoute } from "../middleware/authmiddleware.js";

const router = express.Router();

// Create Claim (protected)
router.post("/", protectRoute, async (req, res) => {
  try {
    const {
      lcmRef,
      claimNo,
      lossType,
      assessmentType,
      status,
      insuredName,
      insuredAddress,
      insuredPhone,
      insuredEmail,
      brokerName,
      brokerPhone,
      brokerEmail,
      brokerAddress,
      insurerName,
      insurerPhone,
      insurerEmail,
      insurerAddress,
      dateOfLoss,
      dateReceived,
      reserveAmount,
      crimeReportNumber,
      acknowledgmentSentDate,
      firstContactDate,
      assessDate,
      firstReportSentDate,
      insurerUpdateDate,
      currentPHContactDate,
      abn,
      itce,
      policyType,
      policyNo,
      inceptionDate,
      dueDate,
      hours,
      hoursRate,
      professionalFeesHrs,
      professionalFeesFlat,
      seniorAdjuster,
      mileageKms,
      mileageRate,
      feeEstimate,
      actualFeeExGST,
      catFee,
      claimManagement,
      parking,
      subcontractorFee,
      policeFireReport,
      miscellaneous,
      travelTime,
      travelCost,
      sharedFee,
      description
    } = req.body;

    const claim = new InsuranceClaim({
      lcmRef,
      claimNo,
      lossType,
      assessmentType,
      status,
      insured: {
        name: insuredName,
        address: insuredAddress,
        phone: insuredPhone,
        email: insuredEmail,
      },
      broker: {
        name: brokerName,
        address: brokerAddress,
        phone: brokerPhone,
        email: brokerEmail,
      },
      insurer: {
        name: insurerName,
        address: insurerAddress,
        phone: insurerPhone,
        email: insurerEmail,
      },
      dateOfLoss,
      dateReceived,
      reserveAmount,
      crimeReportNumber,
      acknowledgmentSentDate,
      firstContactDate,
      assessDate,
      firstReportSentDate,
      insurerUpdateDate,
      currentPHContactDate,
      abn,
      itce,
      policyType,
      policyNo,
      inceptionDate,
      dueDate,
      hours,
      hoursRate,
      professionalFeesHrs,
      professionalFeesFlat,
      seniorAdjuster,
      mileageKms,
      mileageRate,
      feeEstimate,
      actualFeeExGST,
      catFee,
      claimManagement,
      parking,
      subcontractorFee,
      policeFireReport,
      miscellaneous,
      travelTime,
      travelCost,
      sharedFee,
      description,
    });

    await claim.save();
    res.status(201).json(claim);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get Active Claims (protected)
router.get("/active", protectRoute, async (req, res) => {
  try {
    const claims = await InsuranceClaim.find({ status: "Active" });
    res.json(claims);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Closed Claims (protected)
router.get("/closed", protectRoute, async (req, res) => {
  try {
    const claims = await InsuranceClaim.find({ status: "Closed" });
    res.json(claims);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Single Claim (protected)
router.get("/:id", protectRoute, async (req, res) => {
  try {
    const claim = await InsuranceClaim.findById(req.params.id);
    if (!claim) return res.status(404).json({ message: "Claim not found" });
    res.json(claim);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Claim (protected)
router.put("/:id", protectRoute, async (req, res) => {
  try {
    const claim = await InsuranceClaim.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(claim);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
