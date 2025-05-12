// server/src/seed.js
import dotenv from "dotenv";
import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import PatientHistory from "../models/PatientHistory.js";
import { connectDB } from "./db.js";

dotenv.config();

async function seed() {
  await connectDB();

  // 1) Clear all existing data
  await Promise.all([
    Doctor.deleteMany({}),
    Patient.deleteMany({}),
    Appointment.deleteMany({}),
    PatientHistory.deleteMany({}),
  ]);

  // 2) Define some sample doctors
  const doctorsData = [
    {
      username: "jdoe",
      password: "password",
      firstName: "John",
      lastName: "Doe",
      specialty: "Nephrology",
      office: "A234",
    },
    {
      username: "asmith",
      password: "password",
      firstName: "Anna",
      lastName: "Smith",
      specialty: "Cardiology",
      office: "B101",
    },
    {
      username: "bwong",
      password: "password",
      firstName: "Brian",
      lastName: "Wong",
      specialty: "Endocrinology",
      office: "C305",
    },
  ];

  // 3) Create the doctors
  const doctors = await Doctor.insertMany(doctorsData);

  // 4) For each doctor, create 3 patients, 1 appointment & 1 history each
  for (const doc of doctors) {
    for (let i = 1; i <= 3; i++) {
      // Patient
      const pat = await Patient.create({
        firstName: `Patient${i}`,
        lastName: `of${doc.username}`,
        dob: new Date(1980 + i, i, i * 2), // e.g. 1981-01-02, etc.
        doctorId: doc._id,
      });

      // Appointment
      await Appointment.create({
        doctorId: doc._id,
        patientId: pat._id,
        scheduledAt: new Date(2025, 4, 10 + i, 9 + i, 0, 0),
        type: i % 2 === 0 ? "AKI-Followup" : "Dialysis",
        location: `Center ${String.fromCharCode(64 + i)}`,
        notes: `Auto-generated appt #${i}`,
        prediction: {
          modelName: "AKI-RiskEstimator",
          generatedAt: new Date(),
          riskScore: Math.random().toFixed(2),
          riskCategory: ["Low", "Moderate", "High"][i % 3],
        },
      });

      // Patient history
      await PatientHistory.create({
        patientId: pat._id,
        date: new Date(2025, 2, i * 3, 10, 0, 0),
        event: i % 2 === 0 ? "AKI episode" : "Routine check",
        treatment: i % 2 === 0 ? "Medication B" : "Observation",
        notes: `Auto-generated history #${i}`,
      });
    }
  }

  console.log("✅ Seed complete");
  process.exit();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
