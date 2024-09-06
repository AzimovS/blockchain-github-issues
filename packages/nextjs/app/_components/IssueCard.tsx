interface IssueCardProps {
  title: string;
  repo: string;
  date: string;
  labels: string[];
  languages: string[];
}

const IssueCard: React.FC<IssueCardProps> = ({ title, repo, date, labels, languages }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-red-700 font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-600 mb-2">Repository: {repo}</p>
      <p className="text-sm text-gray-600 mb-2">{date}</p>
      <div className="flex flex-wrap gap-2 mb-2">
        {labels.map((label, i) => (
          <span key={i} className="bg-gray-200 text-xs px-2 py-1 rounded">
            {label}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {languages.map((lang, i) => (
          <span key={i} className="bg-blue-100 text-xs px-2 py-1 rounded">
            {lang}
          </span>
        ))}
      </div>
    </div>
  );
};

export default IssueCard;
