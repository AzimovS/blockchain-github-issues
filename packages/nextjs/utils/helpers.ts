import { Issue } from "~~/types/issue/issue";
import { FilterOption } from "~~/types/utils";

export function formatTimeDifference(dateString: string): string {
  const givenDate: Date = new Date(dateString);
  const currentDate: Date = new Date();

  const timeDifference: number = currentDate.getTime() - givenDate.getTime();
  const hoursAgo: number = Math.floor(timeDifference / (1000 * 60 * 60));

  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate: string = givenDate.toLocaleDateString("en-US", options);

  return `${formattedDate} (${hoursAgo} hours ago)`;
}

export const getLanguageCounts = (issues: Issue[]): FilterOption[] => {
  const languageCounts: { [key: string]: number } = {};

  issues.forEach(issue => {
    issue.languages?.forEach((language: string) => {
      if (languageCounts[language]) {
        languageCounts[language]++;
      } else {
        languageCounts[language] = 1;
      }
    });
  });

  return Object.entries(languageCounts)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
};

export const getLabelCounts = (issues: Issue[]): FilterOption[] => {
  const labelCounts: { [key: string]: number } = {};

  issues.forEach(issue => {
    issue.labels?.forEach((label: string) => {
      if (labelCounts[label]) {
        labelCounts[label]++;
      } else {
        labelCounts[label] = 1;
      }
    });
  });

  return Object.entries(labelCounts)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
};
