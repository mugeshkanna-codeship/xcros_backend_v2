import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    agent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    message: {
      type: String,
    },
    pincode: {
      type: String,
    },
    city: {
      type: String,
    },
    domain: {
      type: String,
    },
  },
  { timestamps: true }
);

const AgentMessage = mongoose.model("AgentMessage", schema);

export default AgentMessage;
