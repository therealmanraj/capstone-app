// server/src/routes/patients.js
import { Router } from "express";
import Patient from "../../models/Patient.js";

const router = Router();

// GET /api/patients?doctorId=...
router.get("/", async (req, res) => {
  const { doctorId } = req.query;
  if (!doctorId) {
    return res.status(400).json({ error: "doctorId is required" });
  }
  const patients = await Patient.find({ doctorId });
  res.json(patients);
});

// GET /api/patients/:id
router.get("/:id", async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  if (!patient) return res.status(404).json({ error: "Not found" });
  res.json(patient);
});

// (You can add POST, PUT, DELETE as you need)

export default router;
