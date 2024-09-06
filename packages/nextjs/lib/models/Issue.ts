import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    labels: {
      type: [String],
    },
    assignee: {
      type: [String],
      default: [],
    },
    createdAt: {
      type: String,
    },
    updatedAt: {
      type: String,
    },
    savedAt: {
      type: Date,
    },
    state: {
      type: String,
    },
    htmlUrl: {
      type: String,
    },
    repoName: {
      type: String,
    },
    authorAssociation: {
      type: String,
    },
    forksCount: {
      type: String,
    },
    stargazersCount: {
      type: String,
    },
    languages: {
      type: [String],
    },
  },
  { timestamps: true },
);

const Issue = mongoose.models.Issue || mongoose.model("Issue", issueSchema);

export default Issue;
