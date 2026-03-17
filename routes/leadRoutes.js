const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

// Get all leads
router.get("/", async (req, res) => {
  const leads = await Lead.find();
  res.json(leads);
});

// Add new lead
router.post("/", async (req, res) => {
  const lead = new Lead(req.body);
  await lead.save();
  res.json(lead);
});


// Update lead status / notes
router.put("/:id", async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(lead);
});


router.delete("/:id", async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;