"use client";

import { useEffect, useState } from "react";
import FilterBar from "./_components/FilterBar";
import IssueCard from "./_components/IssueCard";
import Pagination from "./_components/Pagination";
import { checkRateLimit, fetchIssues as fetchIssuesFromDB } from "./issues";
import type { NextPage } from "next";
import { Issue } from "~~/types/issue/issue";
import { IssueMetadataCounts } from "~~/types/utils";
import { ITEMS_PER_PAGE } from "~~/utils/const";
import { getFilterCounts, getIssues } from "~~/utils/getIssues";

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
  const [totalPages, setTotalPages] = useState(5);
  const [issueMetadataCounts, setIssueMetadataCounts] = useState<IssueMetadataCounts>();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const fetchFiltersCounts = async () => {
    const res = await getFilterCounts();
    console.log(res);
    setIssueMetadataCounts(res);
  };

  const fetchIssues = async (page: number, getTotalPages: boolean) => {
    const issuesData = await getIssues({ page: page - 1 });
    setIssues(issuesData?.latestIssues);
    setFilteredIssues(issuesData?.latestIssues);
    if (getTotalPages) {
      setTotalPages(Math.ceil(issuesData?.totalItems / ITEMS_PER_PAGE));
    }
  };

  useEffect(() => {
    fetchIssues(1, true);
    setIsLoading(false);
    fetchFiltersCounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchIssues(currentPage, false);
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

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
          <button className="btn btn-primary" onClick={() => fetchIssuesFromDB()}>
            HI
          </button>
          <button className="btn btn-primary" onClick={() => checkRateLimit()}>
            Rate limit
          </button>
          <button
            className="btn btn-primary"
            onClick={async () => {
              const res = await getFilterCounts();
              console.log(res);
            }}
          >
            Get counts
          </button>
        </div>
        {issueMetadataCounts && <FilterBar issueMetadataCounts={issueMetadataCounts} handleChange={handleChange} />}
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
