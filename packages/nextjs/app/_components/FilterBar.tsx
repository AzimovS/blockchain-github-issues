import SelectDropdown from "./SelectDropDown";
import { IssueMetadataCounts } from "~~/types/utils";

interface FilterBarProps {
  issueMetadataCounts: IssueMetadataCounts;
  handleChange: (newKey: string, newVal: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ issueMetadataCounts, handleChange }) => {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="space-y-2">
          <SelectDropdown
            countResult={issueMetadataCounts?.languageCount}
            defaultOption={"Select Repository Programming Language"}
            curKey={"languages"}
            onChange={handleChange}
          />
          <SelectDropdown
            countResult={issueMetadataCounts?.labelCount}
            defaultOption={"Select Issue Label"}
            curKey={"labels"}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              onClick={() => {
                handleChange("noAssignee", "");
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
