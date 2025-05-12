import { model, Schema, Types } from "mongoose";

const historySchema = new Schema(
  {
    patientId: { type: Types.ObjectId, ref: "Patient", required: true },
    date: { type: Date, required: true },
    event: { type: String, required: true },
    treatment: { type: String },
    notes: { type: String },
  },
  { collection: "patientHistories", timestamps: true }
);

historySchema.index({ patientId: 1, date: -1 });

export default model("PatientHistory", historySchema);
