"use client";

import { useEffect, useState } from "react";
import FilterBar from "./_components/FilterBar";
import IssueCard from "./_components/IssueCard";
import Pagination from "./_components/Pagination";
import { checkRateLimit, fetchIssuesFromOrgs } from "./issues";
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
  const [withoutAssignee, setWithoutAssignee] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(5);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const issues = await getIssues({ page: 1 });
      console.log(issues);
      setIssues(issues);
      setFilteredIssues(issues);
    };

    fetchData();
    setIsLoading(false);
  }, []);

  const filterValues: FilterValues = { language: "", label: "" };

  const handleChange = (filterKey: string, newVal: string) => {
    setIsLoading(true);
    let filteredIssues = issues;
    if (filterKey === "assignee") {
      if (!withoutAssignee) {
        setWithoutAssignee(true);
        filteredIssues = issues.filter((issue: Issue) => !issue?.assignee);
      } else {
        setWithoutAssignee(false);
      }
    } else if (filterKey in filterValues) {
      filterValues[filterKey as keyof FilterValues] = newVal;
    }
    if (filterValues?.language) {
      filteredIssues = issues.filter((issue: Issue) => issue?.languages?.includes(filterValues?.language));
    }
    if (filterValues?.label) {
      filteredIssues = issues.filter((issue: Issue) => issue?.labels?.includes(filterValues?.label));
    }
    setFilteredIssues(filteredIssues);
    console.log(filteredIssues);
    console.log(filterValues, withoutAssignee);
    setIsLoading(false);
  };

  return (
    <>
      <div className="p-6 font-sans">
        <div className="flex items-center flex-col">
          <button className="btn btn-primary" onClick={() => fetchIssuesFromOrgs()}>
            HI
          </button>
          <button className="btn btn-primary" onClick={() => checkRateLimit()}>
            Rate limit
          </button>
        </div>
        <FilterBar issues={issues} handleChange={handleChange} />
        {isLoading ? (
          <div className="flex justify-center mt-10">
            <span className="loading loading-spinner loading-lg "></span>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredIssues.length > 0 &&
              filteredIssues.map((issue: Issue, index: number) => <IssueCard key={index} issue={issue} />)}
            <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
