const FilterBar: React.FC = () => {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-red-700 text-lg font-semibold mb-4">Filters</h2>
        <div className="space-y-2">
          <select className="w-full p-2 border rounded">
            <option>Repo Programming Language</option>
          </select>
          <select className="w-full p-2 border rounded">
            <option>Issue Label</option>
          </select>
          <select className="w-full p-2 border rounded">
            <option>Repository</option>
          </select>
        </div>
        <div className="mt-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Only show issues with no assignee</span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-red-700 text-lg font-semibold mb-4">Sort</h2>
        <select className="w-full p-2 border rounded">
          <option>Sort by</option>
        </select>
      </div>
    </>
  );
};

export default FilterBar;
