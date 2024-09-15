import { NextResponse } from "next/server";
import { fetchIssues } from "~~/app/issues";
import connectdb from "~~/lib/db";
import Issue from "~~/lib/models/Issue";

function MoreThanOneHour(inputDate: Date): boolean {
  const currentTime = new Date();
  const timeDiff = currentTime.getTime() - inputDate.getTime();
  // Convert time difference from milliseconds to hours
  const timeDiffInHours = timeDiff / (1000 * 60 * 60);
  return timeDiffInHours > 1;
}

export const GET = async () => {
  await connectdb();
  const latestIssue = await Issue.findOne().sort({ savedAt: -1 }).exec();
  if (MoreThanOneHour(latestIssue?.savedAt)) {
    fetchIssues();
    return NextResponse.json({ message: "Successfully fetched" });
  }
  return NextResponse.json({ message: "The last fetch was less than one hour" });
};
