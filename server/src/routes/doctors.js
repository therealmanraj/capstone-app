import { Router } from "express";
import Doctor from "../../models/Doctor.js";

const router = Router();

/**
 * POST /api/doctors/login
 * Body: { username, password }
 * Returns basic profile on success, 401 on failure
 */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "username and password are required" });
  }

  try {
    const doctor = await Doctor.findOne({ username });
    if (!doctor || doctor.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    // Strip out the password before returning
    const { _id, firstName, lastName, specialty, office } = doctor;
    res.json({ id: _id, firstName, lastName, specialty, office });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * GET /api/doctors/:id
 * Returns doctor profile (without password)
 */
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select("-password");
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.json(doctor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
