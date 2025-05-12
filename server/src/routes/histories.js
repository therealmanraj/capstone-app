import { Router } from "express";
import PatientHistory from "../../models/PatientHistory.js";

const router = Router();

/**
 * GET /api/histories
 * Query param: patientId
 */
router.get("/", async (req, res) => {
  const { patientId } = req.query;
  if (!patientId) {
    return res.status(400).json({ error: "patientId query param required" });
  }
  try {
    const records = await PatientHistory.find({ patientId }).sort({ date: -1 });
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * GET /api/histories/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const record = await PatientHistory.findById(req.params.id);
    if (!record) return res.status(404).json({ error: "Not found" });
    res.json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * POST /api/histories
 * Body: { patientId, date, event, treatment?, notes? }
 */
router.post("/", async (req, res) => {
  const { patientId, date, event } = req.body;
  if (!patientId || !date || !event) {
    return res
      .status(400)
      .json({ error: "patientId, date and event are required" });
  }
  try {
    const newRecord = await PatientHistory.create(req.body);
    res.status(201).json(newRecord);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid data" });
  }
});

export default router;
