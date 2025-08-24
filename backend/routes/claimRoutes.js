import express from "express";
import InsuranceClaim from "../models/InsuranceClaim.js";

const router = express.Router();

// Create Claim
router.post("/", async (req, res) => {
    try {
        const claim = new InsuranceClaim(req.body);
        await claim.save();
        res.status(201).json(claim);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get All Claims
router.get("/", async (req, res) => {
    try {
        const claims = await InsuranceClaim.find();
        res.json(claims);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Single Claim
router.get("/:id", async (req, res) => {
    try {
        const claim = await InsuranceClaim.findById(req.params.id);
        if (!claim) return res.status(404).json({ message: "Claim not found" });
        res.json(claim);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Claim
router.put("/:id", async (req, res) => {
    try {
        const claim = await InsuranceClaim.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(claim);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
