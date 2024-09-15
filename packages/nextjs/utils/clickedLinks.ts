"use server";

import connectdb from "~~/lib/db";
import ClickedLinks from "~~/lib/models/clickedIssues";
import { Issue } from "~~/types/issue/issue";

export async function getTotalClicks() {
  await connectdb();

  const totalClicks = await ClickedLinks.countDocuments();
  return JSON.parse(JSON.stringify(totalClicks));
}

export async function createNewLinkClick(issue: Issue) {
  const newClickedLink = new ClickedLinks({
    clickedLink: issue?.htmlUrl,
    savedAt: issue?.savedAt,
    repoUrl: issue?.repoUrl,
  });

  newClickedLink.save();
}
