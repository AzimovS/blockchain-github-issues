"use client";

import { useEffect, useState } from "react";
import FilterBar from "./_components/FilterBar";
import IssueCard from "./_components/IssueCard";
import IssueCardSkeleton from "./_components/IssueCardSkeleton";
import Pagination from "./_components/Pagination";
import type { NextPage } from "next";
import { Issue } from "~~/types/issue/issue";
import { FilterValues, IssueMetadataCounts } from "~~/types/utils";
import { ITEMS_PER_PAGE } from "~~/utils/const";
import { getFilterCounts, getIssues } from "~~/utils/getIssues";

const Home: NextPage = () => {
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

  const updateIssues = async (newIssues: Issue[]) => {
    setFilteredIssues(newIssues);
    // You cannot await setState, so code here will run before the state is updated
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

  const fetchIssues = async (page: number, updateTotalPages: boolean) => {
    const { latestIssues, totalItems } = await getIssues({ page: page - 1, filterValues });
    if (updateTotalPages) {
      setTotalPages(Math.ceil(totalItems / ITEMS_PER_PAGE));
    }
    await updateIssues(latestIssues);
  };

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      await fetchIssues(1, true);
      await fetchFiltersCounts(filterValues);
      setIsLoading(false);
    };
    initializeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const updateIssues = async () => {
      setIsLoading(true);
      await fetchIssues(currentPage, currentPage === 1);
      setIsLoading(false);
    };
    updateIssues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    const updateFilters = async () => {
      setIsLoading(true);
      await fetchFiltersCounts(filterValues);
      if (currentPage !== 1) {
        setCurrentPage(1);
      } else {
        await fetchIssues(currentPage, true);
      }
      setIsLoading(false);
    };
    updateFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValues]);

  const handleFilterChange = (filterKey: string, newVal: string) => {
    setFilterValues(prevValues => ({
      ...prevValues,
      [filterKey]: filterKey === "noAssignee" ? !prevValues.noAssignee : newVal,
    }));
  };

  return (
    <>
      <div className="p-6 font-sans">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:fixed lg:ml-4 lg:top-20 lg:left-0 lg:h-auto lg:w-96 lg:flex-shrink-0">
            <FilterBar issueMetadataCounts={issueMetadataCounts} handleChange={handleFilterChange} />
          </div>
          <div className="lg:ml-96 space-y-4 w-full">
            {isLoading || filteredIssues?.length === 0 ? (
              Array.from({ length: 5 }).map((_, index) => <IssueCardSkeleton key={index} />)
            ) : (
              <>
                {filteredIssues.map((issue, index) => (
                  <IssueCard key={index} issue={issue} />
                ))}
                <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
