import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    main: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    primary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PrimaryCategory",
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
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Tag",
      default:null
    },
    domain: {
      type: String,
    },
    is_promoted: {
      type: String,
    },
  },
  { timestamps: true }
);

const SecondaryCategory = mongoose.model(
  "SecondaryCategory",
  schema,
  "secondarycategory"
);

export default SecondaryCategory;
