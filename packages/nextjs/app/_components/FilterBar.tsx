import SelectDropdown from "./SelectDropDown";
import { Issue } from "~~/types/issue/issue";
import { getLabelCounts, getLanguageCounts } from "~~/utils/helpers";

interface FilterBarProps {
  issues: Issue[];
  handleChange: (newKey: string, newVal: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ issues, handleChange }) => {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="space-y-2">
          <SelectDropdown
            filterOptions={getLanguageCounts(issues)}
            defaultOption={"Select Repository Programming Language"}
            curKey={"language"}
            onChange={handleChange}
          />
          <SelectDropdown
            filterOptions={getLabelCounts(issues)}
            defaultOption={"Select Issue Label"}
            curKey={"label"}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              onClick={() => {
                handleChange("assignee", "");
              }}
            />
            <span className="text-sm">Only show issues with no assignee</span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Sort</h2>
        <select className="w-full p-2 border rounded">
          <option>Sort by</option>
        </select>
      </div>
    </>
  );
};

export default FilterBar;
