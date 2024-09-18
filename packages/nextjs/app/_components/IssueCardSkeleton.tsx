const IssueCardSkeleton: React.FC = () => {
  return (
    <div className="p-4 rounded border-2 shadow animate-pulse">
      <div className="h-6 bg-gray-300 rounded mb-1"></div>
      <div className="h-4 bg-gray-300 rounded mb-1"></div>
      <div className="h-4 bg-gray-300 rounded mb-1"></div>
      <div className="h-4 bg-gray-300 rounded mb-1"></div>
      <div className="h-4 bg-gray-300 rounded mb-1"></div>
      <div className="h-4 bg-gray-300 rounded mb-1"></div>

      <div className="flex flex-wrap gap-2 mb-2">
        <div className="h-4 w-20 bg-gray-300 rounded-xl"></div>
        <div className="h-4 w-16 bg-gray-300 rounded-xl"></div>
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="h-4 w-20 bg-gray-300 rounded-xl"></div>
        <div className="h-4 w-16 bg-gray-300 rounded-xl"></div>
        <div className="h-4 w-12 bg-gray-300 rounded-xl"></div>
      </div>
    </div>
  );
};

export default IssueCardSkeleton;
