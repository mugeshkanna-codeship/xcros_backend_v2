import mongoose from "mongoose";

const legalAcceptanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
    lastAcceptedDate: {
      type: Date,
      required: true,
    },
    acceptedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Compound index to ensure one acceptance per user per domain
legalAcceptanceSchema.index({ user: 1, domain: 1 }, { unique: true });

const LegalAcceptance = mongoose.model(
  "LegalAcceptance",
  legalAcceptanceSchema,
  "legal_acceptances"
);

export default LegalAcceptance;