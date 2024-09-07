import Link from "next/link";
import { Issue } from "~~/types/issue/issue";

interface IssueCardProps {
  issue: Issue;
}

function formatTimeDifference(dateString: string): string {
  const givenDate: Date = new Date(dateString);
  const currentDate: Date = new Date();

  const timeDifference: number = currentDate.getTime() - givenDate.getTime();
  const hoursAgo: number = Math.floor(timeDifference / (1000 * 60 * 60));

  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate: string = givenDate.toLocaleDateString("en-US", options);

  return `${formattedDate} (${hoursAgo} hours ago)`;
}
const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-red-700 font-semibold mb-1">
        <Link href={issue?.htmlUrl} rel="noopener noreferrer" target="_blank">
          {issue?.title}
        </Link>
      </h3>
      <p className="text-sm text-gray-600 mb-2">
        Repository:{" "}
        <Link href={issue?.repoUrl} rel="noopener noreferrer" target="_blank">
          {issue?.repoName}
        </Link>
      </p>
      <p className="text-sm text-gray-600 mb-2">{formatTimeDifference(issue?.createdAt as string)}</p>
      <div className="flex flex-wrap gap-2 mb-2">
        {issue?.labels.map((label: string, i: number) => (
          <span key={i} className="bg-gray-200 text-xs px-2 py-1 rounded">
            {label}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {issue?.languages?.map((lang: string, i: number) => (
          <span key={i} className="bg-blue-100 text-xs px-2 py-1 rounded">
            {lang}
          </span>
        ))}
      </div>
    </div>
  );
};

export default IssueCard;
