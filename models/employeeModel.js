import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, lowercase: true, required: true },
    age: { type: Number, required: true },
    gender: {
      type: String,
      enum: ["male", "female"],
      lowercase: true,
      trim: true,
      required: true,
    },
    mobile: { type: Number, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    isMarried: {type: Boolean, default: false}
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
