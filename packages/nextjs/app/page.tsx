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
  languages: string;
  labels: string;
  noAssignee: boolean;
}

const Home: NextPage = () => {
  // const [issues, setIssues] = useState<Issue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [filterValues, setFilterValues] = useState<FilterValues>({ languages: "", labels: "", noAssignee: false });
  const [issueMetadataCounts, setIssueMetadataCounts] = useState<IssueMetadataCounts>({
    labelCount: [],
    languageCount: [],
  });

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const fetchFiltersCounts = async (filterVals: FilterValues) => {
    const res: IssueMetadataCounts = await getFilterCounts(filterVals);
    if (filterVals?.labels.length === 0 && filterVals?.languages.length === 0) {
      setIssueMetadataCounts(res);
    } else if (filterVals?.labels.length !== 0 && filterVals?.languages.length !== 0) {
      return;
    } else if (filterVals?.labels.length > 0) {
      setIssueMetadataCounts(prevValues => ({ ...prevValues, languageCount: res?.languageCount }));
    } else if (filterVals?.languages.length > 0) {
      setIssueMetadataCounts(prevValues => ({ ...prevValues, labelCount: res?.labelCount }));
    }
  };

  const fetchIssues = async (page: number, getTotalPages: boolean) => {
    const issuesData = await getIssues({ page: page - 1 });
    // setIssues(issuesData?.latestIssues);
    setFilteredIssues(issuesData?.latestIssues);
    if (getTotalPages) {
      setTotalPages(Math.ceil(issuesData?.totalItems / ITEMS_PER_PAGE));
    }
  };

  useEffect(() => {
    fetchIssues(1, true);
    setIsLoading(false);
    fetchFiltersCounts(filterValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchIssues(currentPage, false);
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    setIsLoading(true);
    fetchFiltersCounts(filterValues);
    setIsLoading(false);
    console.log(filterValues);
    console.log(filteredIssues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValues]);

  const handleFilterChange = (filterKey: string, newVal: string) => {
    setIsLoading(true);
    if (filterKey === "noAssignee") {
      setFilterValues(prevValues => ({ ...prevValues, noAssignee: !filterValues?.noAssignee }));
    } else if (filterKey === "languages") {
      console.log("languages changed");
      setFilterValues(prevValues => ({ ...prevValues, languages: newVal }));
    } else if (filterKey === "labels") {
      setFilterValues(prevValues => ({ ...prevValues, labels: newVal }));
    }
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
          {/* <button
            className="btn btn-primary"
            onClick={async () => {
              const res = await getFilterCounts();
              console.log(res);
            }}
          >
            Get counts
          </button> */}
        </div>
        {issueMetadataCounts && (
          <FilterBar issueMetadataCounts={issueMetadataCounts} handleChange={handleFilterChange} />
        )}
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
