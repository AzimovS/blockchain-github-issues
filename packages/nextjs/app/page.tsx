"use client";

import { useEffect, useState } from "react";
import FilterBar from "./_components/FilterBar";
import IssueCard from "./_components/IssueCard";
import { fetchIssuesFromOrgs } from "./issues";
import type { NextPage } from "next";
import { getIssues } from "~~/utils/getIssues";

const Home: NextPage = () => {
  const [issues, setIssues] = useState<any>([]);
  // const issues = await getIssues();
  // const issues = [
  //   {
  //     title: "Test 1",
  //     repo: "test",
  //     date: "test",
  //     labels: ["test"],
  //     languages: ["HI"],
  //   },
  //   {
  //     title: "test",
  //     repo: "test",
  //     date: "tes",
  //     labels: ["test", "test"],
  //     languages: ["HI"],
  //   },
  // ];

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
          {issues.length > 0 &&
            issues.map((issue: any, index: number) => (
              <IssueCard
                key={index}
                title={issue.title}
                repo={issue.repo}
                date={issue.date}
                labels={issue.labels}
                languages={issue.languages}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
