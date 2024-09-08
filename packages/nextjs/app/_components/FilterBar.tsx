import SelectDropdown from "./SelectDropDown";
import { Issue } from "~~/types/issue/issue";
import { FilterOption } from "~~/types/utils";

interface FilterBarProps {
  issues: Issue[];
  handleChange: (newKey: string, newVal: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ issues, handleChange }) => {
  const getLanguageCounts = (issues: Issue[]): FilterOption[] => {
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

  return (
    <>
      <div className="mb-6">
        <h2 className="text-red-700 text-lg font-semibold mb-4">Filters</h2>
        <div className="space-y-2">
          <SelectDropdown
            filterOptions={getLanguageCounts(issues)}
            defaultOption={"Select Repository Programming Language"}
            curKey={"language"}
            onChange={handleChange}
          />
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
