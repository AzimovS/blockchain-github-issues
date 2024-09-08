import Link from "next/link";
import { Issue } from "~~/types/issue/issue";
import { formatTimeDifference } from "~~/utils/helpers";

interface IssueCardProps {
  issue: Issue;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-red-700 font-semibold mb-1">
        <Link href={issue?.htmlUrl} rel="noopener noreferrer" target="_blank">
          {issue?.title}
        </Link>
      </h3>
      <p className="text-sm text-gray-600 my-1">
        Repository:{" "}
        <Link href={issue?.repoUrl} rel="noopener noreferrer" target="_blank">
          {issue?.repoName}
        </Link>
      </p>
      <p className="text-sm text-gray-600 my-0.5">{formatTimeDifference(issue?.createdAt as string)}</p>
      <p className="text-sm text-gray-600 my-0.5">Stars: {issue?.stargazersCount}</p>
      <p className="text-sm text-gray-600 my-0.5">Forks: {issue?.forksCount}</p>
      <p className="text-sm text-gray-600 my-0.5">Assignee: {issue?.assignee || ""}</p>
      <div className="flex flex-wrap gap-2 mb-2">
        {issue?.labels.map((label: string, i: number) => (
          <span key={i} className="bg-gray-200 text-xs px-2 py-1 rounded-xl">
            {label}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <p className="text-sm text-gray-600 my-0.5">Repo Language: </p>
        {issue?.languages?.map((lang: string, i: number) => (
          <span key={i} className="bg-blue-100 text-xs px-2 py-1 rounded-xl">
            {lang}
          </span>
        ))}
      </div>
    </div>
  );
};

export default IssueCard;
