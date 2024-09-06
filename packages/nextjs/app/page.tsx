"use client";

import FilterBar from "./_components/FilterBar";
import IssueCard from "./_components/IssueCard";
import { fetchIssuesFromOrgs } from "./issues";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const issues = [
    {
      title: "Test 1",
      repo: "test",
      date: "test",
      labels: ["test"],
      languages: ["HI"],
    },
    {
      title: "test",
      repo: "test",
      date: "tes",
      labels: ["test", "test"],
      languages: ["HI"],
    },
  ];

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <button className="btn btn-primary" onClick={() => fetchIssuesFromOrgs()}>
          HI
        </button>
      </div>
      <div className="p-6 font-sans">
        <FilterBar />
        <div className="space-y-4">
          {issues.map((issue, index) => (
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
