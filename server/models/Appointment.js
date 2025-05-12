import { model, Schema, Types } from "mongoose";

const appointmentSchema = new Schema(
  {
    doctorId: { type: Types.ObjectId, ref: "Doctor", required: true },
    patientId: { type: Types.ObjectId, ref: "Patient", required: true },
    scheduledAt: { type: Date, required: true },
    type: { type: String },
    location: { type: String },
    notes: { type: String },

    // optional ML output
    prediction: {
      modelName: String,
      generatedAt: Date,
      riskScore: Number,
      riskCategory: String,
    },
  },
  { collection: "appointments", timestamps: true }
);

appointmentSchema.index({ doctorId: 1, scheduledAt: 1 });

export default model("Appointment", appointmentSchema);
