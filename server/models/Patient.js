import { model, Schema, Types } from "mongoose";

const patientSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: Date },
    doctorId: { type: Types.ObjectId, ref: "Doctor", required: true },
  },
  { collection: "patients", timestamps: true }
);

patientSchema.index({ doctorId: 1 });

export default model("Patient", patientSchema);
