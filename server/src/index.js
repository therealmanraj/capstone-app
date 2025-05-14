// server/src/index.js
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { connectDB } from "./db.js";

// Import your routers (we’ll create these next)
import appointmentRouter from "./routes/appointments.js";
import doctorRouter from "./routes/doctors.js";
import historyRouter from "./routes/histories.js";
import patientRouter from "./routes/patients.js";

async function start() {
  await connectDB();

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  // Mount your routers under /api
  app.use("/api/doctors", doctorRouter);
  app.use("/api/patients", patientRouter);
  app.use("/api/appointments", appointmentRouter);
  app.use("/api/histories", historyRouter);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

start().catch(console.error);
