import React, { ChangeEvent } from "react";
import { FilterOption } from "~~/types/utils";

interface SelectDropdownProps {
  filterOptions: FilterOption[];
  defaultOption: string;
  curKey: string;
  onChange: (newKey: string, newVal: string) => void;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({ filterOptions, defaultOption, onChange, curKey }) => {
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    console.log(curKey, value);
    onChange(curKey, value);
  };

  return (
    <div className="flex flex-col space-y-2">
      <select
        id="filterDropdown"
        className="select select-bordered rounded-lg w-full text-md"
        onChange={handleSelectChange}
      >
        <option key="defaultOption" value="">
          {defaultOption}
        </option>
        {filterOptions.map(({ label, count }) => (
          <option key={label} value={label}>
            {label} ({count})
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDropdown;
