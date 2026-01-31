import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    domain: {
      type: String,
    },
    main: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Category",
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    active: {
      type: String,
    },
    slug: {
      type: String,
    },
    uid: {
      type: String,
    },
    icon: {
      type: String,
    },
    tags: {
      type: [ mongoose.Schema.Types.ObjectId ],
      ref:"Tag"
    },
    is_promoted:{
      type:String,
    }
  },
  { timestamps: true }
);

const PrimaryCategory = mongoose.model("PrimaryCategory", schema , "primarycategory");

export default PrimaryCategory;