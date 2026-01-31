import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    domain: {
      type: String,
      required: true,
    },
    role_name: {
      type: String,
      required: true,
      unique: true,
    },
    permissions: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Role = mongoose.model("Role", roleSchema);

export default Role;