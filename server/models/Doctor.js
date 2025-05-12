import { Schema, model } from "mongoose";

const doctorSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // plain text for now
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    specialty: { type: String },
    office: { type: String },
  },
  { collection: "doctors", timestamps: true }
);

export default model("Doctor", doctorSchema);
