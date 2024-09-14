"use server";

import connectdb from "~~/lib/db";
import Issue from "~~/lib/models/Issue";

export async function getIssues({ page = 1 }: { page: number }) {
  const NUM_PER_PAGE = 20;
  await connectdb();
  const latestIssue = await Issue.findOne().sort({ savedAt: -1 }).exec();
  const latestIssues = await Issue.find({ savedAt: latestIssue?.savedAt })
    .sort({ createdAt: -1 })
    .skip(NUM_PER_PAGE * page)
    .limit(NUM_PER_PAGE);
  console.log(await Issue.countDocuments({ savedAt: latestIssue?.savedAt }));
  return JSON.parse(JSON.stringify(latestIssues));
}
