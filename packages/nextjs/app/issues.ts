"use server";

import connectdb from "~~/lib/db";
import Issue from "~~/lib/models/Issue";
import { REPOS } from "~~/utils/const";

const GITHUB_API_BASE_URL = "https://api.github.com";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Utility function to handle GitHub API requests
async function githubApiRequest(url: string) {
  await connectdb();
  let results: any = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const res = await fetch(`${url}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
    }

    const data = await res.json();
    results = [...results, ...data];

    // Check if there are more pages by looking at the Link header
    const linkHeader = res.headers.get("link");
    hasMore = Boolean(linkHeader && linkHeader.includes('rel="next"'));
    page++;
  }

  return results;
}

async function fetchRepoInfo(repoFullName: string) {
  const response = await fetch(`https://api.github.com/repos/${repoFullName}`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch repo info: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

// Function to get all issues for a given repository
async function getIssues(repoFullName: string) {
  const url = `${GITHUB_API_BASE_URL}/repos/${repoFullName}/issues?per_page=100`;
  return githubApiRequest(url);
}

// Main function to iterate over organizations and fetch repositories and issues
export async function fetchIssues() {
  const currentDate = new Date();

  for (const repo of REPOS) {
    try {
      const repoInfo = await fetchRepoInfo(repo);
      const issues = await getIssues(repo);
      console.log(`Found ${issues.length} issues in repository ${repoInfo?.name}`);
      // Process each issue
      issues.forEach(async (issue: any) => {
        // console.log(issue);
        if (issue?.pull_request) {
          return;
        }
        const newIssue = new Issue({
          number: issue.number,
          title: issue.title,
          assignee: issue.assignee?.login || "",
          createdAt: new Date(issue.created_at),
          updatedAt: new Date(issue.updated_at),
          state: issue.state,
          htmlUrl: issue?.html_url,
          repoName: repoInfo?.name,
          authorAssociation: issue?.author_association,
          forksCount: repoInfo?.forks_count,
          stargazersCount: repoInfo?.stargazers_count,
          languages: repoInfo?.language,
          savedAt: currentDate,
          repoUrl: repoInfo?.html_url,
          org: repoInfo?.owner?.login,
          labels: issue?.labels?.map((label: any) => label.name),
        });

        await newIssue.save();
        // console.log(`Saved at: ${currentDate}`);
        // console.log(`Issue #${issue.number}: ${issue.title}`);
        // console.log(`Labels: ${issue.labels.map((label: any) => label.name).join(", ")}`);
        // console.log(`Assignee: ${issue.assignees.map((assignee: any) => assignee.name).join(", ")}`);
        // console.log(`Created at: ${issue.created_at}`);
        // console.log(`Updated at: ${issue.updated_at}`);
        // console.log(`State: ${issue.state}`);
        // console.log(`URL: ${issue.html_url}`);
        // console.log(`Repository: ${repo.name}`);
        // console.log(`Repository Full name: ${org}/${repo.name}`);
        // console.log(`Author association: ${issue.author_association}`);
        // console.log(`Repo Forks count: ${repo.forks_count}`);
        // console.log(`Repo Stars count: ${repo.stargazers_count}`);
        // console.log(`Repo Language: ${repo.language}`);
        // console.log("---");
      });
    } catch (error) {
      console.error(`Error fetching issues for repo ${repo}:`, error);
    }
  }

  console.log("DONE");
}

export async function checkRateLimit() {
  try {
    const response = await fetch("https://api.github.com/rate_limit", {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch rate limit info: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Rate Limit Info:", data);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching rate limit info:", error.message);
    } else {
      console.error("An unknown error occurred.");
    }
  }
}
