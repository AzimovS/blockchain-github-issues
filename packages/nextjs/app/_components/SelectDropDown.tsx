import React, { ChangeEvent } from "react";
import { CountResult } from "~~/types/utils";

interface SelectDropdownProps {
  countResult: CountResult[];
  defaultOption: string;
  curKey: string;
  onChange: (newKey: string, newVal: string) => void;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({ countResult, defaultOption, onChange, curKey }) => {
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    console.log(curKey, value);
    onChange(curKey, value);
  };

  console.log(countResult);

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
        {countResult?.map(({ _id, count }) => (
          <option key={_id} value={_id}>
            {_id} ({count})
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDropdown;
