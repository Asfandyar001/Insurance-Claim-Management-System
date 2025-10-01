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

// Add timestamp to a claim (protected)
router.post("/:id/timeline", protectRoute, async (req, res) => {
  try {
    const { description, hours } = req.body;

    const claim = await InsuranceClaim.findById(req.params.id);
    if (!claim) return res.status(404).json({ message: "Claim not found" });

    const newTimestamp = { description, hours };

    claim.timeline.push(newTimestamp);
    await claim.save();

    res.status(201).json(newTimestamp);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a timestamp inside claim.timeline (protected)
router.put("/:id/timeline/:timestampId", protectRoute, async (req, res) => {
  try {
    const { id, timestampId } = req.params;
    const { description, hours } = req.body;

    const claim = await InsuranceClaim.findById(id);
    if (!claim) return res.status(404).json({ message: "Claim not found" });

    // Find the timestamp inside the claim
    const timestamp = claim.timeline.id(timestampId);
    if (!timestamp) return res.status(404).json({ message: "Timestamp not found" });

    // Update fields
    if (description !== undefined) timestamp.description = description;
    if (hours !== undefined) timestamp.hours = hours;

    await claim.save();
    res.json(timestamp);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete timestamp by index
router.delete("/:id/timeline/:index", protectRoute, async (req, res) => {
  try {
    const { id, index } = req.params;

    const claim = await InsuranceClaim.findById(id);
    if (!claim) return res.status(404).json({ message: "Claim not found" });

    if (index < 0 || index >= claim.timeline.length) {
      return res.status(404).json({ message: "Timestamp not found" });
    }

    claim.timeline.splice(index, 1);
    await claim.save();

    res.json({ message: "Timestamp deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
