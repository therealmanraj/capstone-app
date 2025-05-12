import { Router } from "express";
import Appointment from "../../models/Appointment.js";

const router = Router();

/**
 * GET /api/appointments
 * Query params: doctorId, patientId
 * Returns all matching appointments, sorted by scheduledAt
 */
router.get("/", async (req, res) => {
  const { doctorId, patientId } = req.query;
  const filter = {};
  if (doctorId) filter.doctorId = doctorId;
  if (patientId) filter.patientId = patientId;

  try {
    const appts = await Appointment.find(filter)
      .sort({ scheduledAt: 1 })
      .populate("patientId", "firstName lastName");
    res.json(appts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// router.get("/", async (req, res) => {
//   const { doctorId, patientId } = req.query;
//   const filter = {};
//   if (doctorId) filter.doctorId = doctorId;
//   if (patientId) filter.patientId = patientId;

//   try {
//     const appts = await Appointment.find(filter).sort({ scheduledAt: 1 });
//     res.json(appts);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

/**
 * GET /api/appointments/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.id);
    if (!appt) return res.status(404).json({ error: "Not found" });
    res.json(appt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * POST /api/appointments
 * Body: { doctorId, patientId, scheduledAt, type, location, notes, prediction? }
 */
router.post("/", async (req, res) => {
  try {
    const newAppt = await Appointment.create(req.body);
    res.status(201).json(newAppt);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid data" });
  }
});

/**
 * PUT /api/appointments/:id
 * Replaces the appointment document
 */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid data" });
  }
});

/**
 * DELETE /api/appointments/:id
 */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
