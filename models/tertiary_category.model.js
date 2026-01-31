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
    secondary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SecondaryCategory",
    },
    name: {
      type: String,
      unique: true,
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
  },
  { timestamps: true }
);

const TertiaryCategory = mongoose.model(
  "TertiaryCategory",
  schema,
  "tertiaryCategory"
);

export default TertiaryCategory;
