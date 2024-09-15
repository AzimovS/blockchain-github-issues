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

export async function getFilterCounts() {
  try {
    const latestIssue = await Issue.findOne().sort({ savedAt: -1 }).exec();
    const result = await Issue.aggregate([
      {
        $match: { savedAt: latestIssue?.savedAt },
      },
      {
        $facet: {
          labelCount: [
            { $unwind: "$labels" }, // Deconstruct the labels array
            { $group: { _id: "$labels", count: { $sum: 1 } } },
            { $sort: { count: -1 } }, // Sort by count in descending order
          ],
          languageCount: [
            { $unwind: "$languages" }, // Deconstruct the languages array
            { $group: { _id: "$languages", count: { $sum: 1 } } },
            { $sort: { count: -1 } }, // Sort by count in descending order
          ],
        },
      },
    ]);

    // console.log(JSON.stringify(result, null, 2)); // Print nicely formatted JSON
    return JSON.parse(JSON.stringify(result?.[0]));
  } catch (err) {
    console.error(err);
  }
}
