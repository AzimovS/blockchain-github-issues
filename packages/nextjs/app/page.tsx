"use client";

import { useEffect, useState } from "react";
import FilterBar from "./_components/FilterBar";
import IssueCard from "./_components/IssueCard";
import { fetchIssuesFromOrgs } from "./issues";
import type { NextPage } from "next";
import { Issue } from "~~/types/issue/issue";
import { getIssues } from "~~/utils/getIssues";

const Home: NextPage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const issues = await getIssues();
      setIssues(issues);
    };

    fetchData();
  }, []);

  console.log(issues);

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
        <FilterBar />
        <div className="space-y-4">
          {issues.length > 0 && issues.map((issue: Issue, index: number) => <IssueCard key={index} issue={issue} />)}
        </div>
      </div>
    </>
  );
};

export default Home;
