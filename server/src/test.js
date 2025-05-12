// server/src/test.js
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import { connectDB } from "./db.js";

async function test() {
  await connectDB();

  // 1) Get one doctor
  const doc = await Doctor.findOne({});
  console.log("Doctor:", doc);

  if (!doc) {
    console.log("❌ No doctors found—seed first!");
    process.exit();
  }

  // 2) Find all patients whose doctorId matches that _id
  const patients = await Patient.find({ doctorId: doc._id });
  console.log("Patients:", patients);

  process.exit();
}

test();
