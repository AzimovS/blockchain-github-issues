import mongoose from "mongoose";

const clickedLinkSchema = new mongoose.Schema(
  {
    clickedLink: {
      type: String,
    },
    repoName: {
      type: String,
    },
    repoUrl: {
      type: String,
    },
  },
  { timestamps: true },
);

const ClickedLinks = mongoose.models.ClickedLinks || mongoose.model("ClickedLinks", clickedLinkSchema);

export default ClickedLinks;
