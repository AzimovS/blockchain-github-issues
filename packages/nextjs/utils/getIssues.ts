"use server";

import connectdb from "~~/lib/db";
import Issue from "~~/lib/models/Issue";

// Function to get all issues for a given repository
export async function getIssues() {
  await connectdb();
  const latestIssue = await Issue.findOne().sort({ savedAt: -1 }).exec();
  const latestIssues = await Issue.find({ savedAt: latestIssue?.savedAt });
  return JSON.parse(JSON.stringify(latestIssues));
}
