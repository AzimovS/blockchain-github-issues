"use client";

import { useEffect, useState } from "react";
import FilterBar from "./_components/FilterBar";
import IssueCard from "./_components/IssueCard";
import { fetchIssuesFromOrgs } from "./issues";
import type { NextPage } from "next";
import { Issue } from "~~/types/issue/issue";
import { getIssues } from "~~/utils/getIssues";

interface FilterValues {
  language: string;
  label: string;
}

const Home: NextPage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const issues = await getIssues();
      setIssues(issues);
      setFilteredIssues(issues);
    };

    fetchData();
  }, []);

  console.log(issues);

  const filterValues: FilterValues = { language: "", label: "" };

  useEffect(() => {
    const filteredValues = issues.filter((issue: Issue) => issue?.languages?.includes(filterValues?.language));
    console.log(filteredValues);
  }, [filterValues]);

  const handleChange = (filterKey: string, newVal: string) => {
    let filteredValues = issues;
    if (filterKey in filterValues) {
      filterValues[filterKey as keyof FilterValues] = newVal;
    }
    if (filterValues?.language) {
      filteredValues = issues.filter((issue: Issue) => issue?.languages?.includes(filterValues?.language));
    }
    if (filterValues?.label) {
      filteredValues = issues.filter((issue: Issue) => issue?.labels?.includes(filterValues?.label));
    }
    setFilteredIssues(filteredValues);
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <button className="btn btn-primary" onClick={() => fetchIssuesFromOrgs()}>
          HI
        </button>
        <button className="btn btn-primary" onClick={() => getIssues()}>
          mongotest
        </button>
      </div>
      <div className="p-6 font-sans">
        <FilterBar issues={issues} handleChange={handleChange} />
        <div className="space-y-4">
          {filteredIssues.length > 0 &&
            filteredIssues.map((issue: Issue, index: number) => <IssueCard key={index} issue={issue} />)}
        </div>
      </div>
    </>
  );
};

export default Home;
