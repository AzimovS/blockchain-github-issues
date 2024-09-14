"use server";

import { ITEMS_PER_PAGE } from "./const";
import connectdb from "~~/lib/db";
import Issue from "~~/lib/models/Issue";

export async function getIssues({ page = 0 }: { page: number }) {
  await connectdb();
  const latestIssue = await Issue.findOne().sort({ savedAt: -1 }).exec();
  const latestIssues = await Issue.find({ savedAt: latestIssue?.savedAt })
    .sort({ createdAt: -1 })
    .skip(ITEMS_PER_PAGE * page)
    .limit(ITEMS_PER_PAGE);
  let totalItems = 0;
  if (page === 0) {
    totalItems = await Issue.countDocuments({ savedAt: latestIssue?.savedAt });
  }
  return {
    totalItems,
    latestIssues: JSON.parse(JSON.stringify(latestIssues)),
  };
}
