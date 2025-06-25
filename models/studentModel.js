import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    fname: { type: String, trim: true, required: true },
    lname: { type: String, trim: true, required: true },
    age: { type: Number, required: true },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      trim: true,
      required: true,
    },
    mobile: { type: Number, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    isMarried: {type: Boolean, default: false}
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
