import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    primary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faq_Listing",
      default: null,
    },
    question: {
      type: String,
    },
    answer: {   
      type: String,
    },
    domain: {
      type: String,
    },
  },
  { timestamps: true }
);

const Faq_Listing_Content = mongoose.model("Faq_Listing_Content", schema);

export default Faq_Listing_Content;
