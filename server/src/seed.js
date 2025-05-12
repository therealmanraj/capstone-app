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

  // clear collections
  await Promise.all([
    Doctor.deleteMany({}),
    Patient.deleteMany({}),
    Appointment.deleteMany({}),
    PatientHistory.deleteMany({}),
  ]);

  const doc = await Doctor.create({
    username: "jdoe",
    password: "password",
    firstName: "John",
    lastName: "Doe",
    specialty: "Nephrology",
    office: "A234",
  });

  const pat = await Patient.create({
    firstName: "Alice",
    lastName: "Smith",
    dob: new Date("1990-05-20"),
    doctorId: doc._id,
  });

  await Appointment.create([
    {
      doctorId: doc._id,
      patientId: pat._id,
      scheduledAt: new Date("2025-05-12T09:00:00Z"),
      type: "Dialysis",
      location: "Center A",
      notes: "Routine session",
      prediction: {
        modelName: "AKI‑RiskEstimator",
        generatedAt: new Date(),
        riskScore: 0.82,
        riskCategory: "Moderate",
      },
    },
  ]);

  await PatientHistory.create([
    {
      patientId: pat._id,
      date: new Date("2025-03-15T10:00:00Z"),
      event: "AKI episode",
      treatment: "Medication B",
      notes: "Elevated BUN",
    },
  ]);

  console.log("✅ Seed complete");
  process.exit();
}

seed();
