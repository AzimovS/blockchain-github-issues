"use server";

import connectdb from "~~/lib/db";
import Issue from "~~/lib/models/Issue";

// This script assumes you have a list of GitHub organizations
const organizations = ["scaffold-eth", "BuidlGuidl", "ethereum-optimism"]; // Replace with your GitHub organizations

const GITHUB_API_BASE_URL = "https://api.github.com";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // It's safer to use environment variables for tokens

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

// Function to get all repositories for a given organization
async function getRepositories(org: string) {
  const url = `${GITHUB_API_BASE_URL}/orgs/${org}/repos?per_page=100`;
  return githubApiRequest(url);
}

// Function to get all issues for a given repository
async function getIssues(org: string, repo: string) {
  const url = `${GITHUB_API_BASE_URL}/repos/${org}/${repo}/issues?per_page=100`;
  return githubApiRequest(url);
}

function isLessThan90Days(date1: Date, date2: Date): boolean {
  // Calculate the difference in milliseconds
  const diffInMs: number = Math.abs(date2.getTime() - date1.getTime());

  // Convert milliseconds to days
  const diffInDays: number = diffInMs / (1000 * 60 * 60 * 24);

  // Return true if the difference is less than 90 days
  return diffInDays < 90;
}

// Main function to iterate over organizations and fetch repositories and issues
export async function fetchIssuesFromOrgs() {
  const currentDate = new Date();

  for (const org of organizations) {
    try {
      const repos = await getRepositories(org);
      console.log(`Found ${repos.length} repositories for organization ${org}`);

      for (const repo of repos) {
        if (repo?.archived) continue;
        if (!isLessThan90Days(currentDate, new Date(repo?.pushed_at))) continue;
        try {
          const issues = await getIssues(org, repo.name);
          console.log(`Found ${issues.length} issues in repository ${repo.name} of organization ${org}`);
          // Process each issue
          issues.forEach(async (issue: any) => {
            // console.log(issue);
            if (issue?.pull_request) {
              return;
            }
            const newIssue = new Issue({
              number: issue.number,
              title: issue.title,
              assignee: issue.assignee?.login,
              createdAt: new Date(issue.created_at),
              updatedAt: new Date(issue.updated_at),
              state: issue.state,
              htmlUrl: issue?.html_url,
              repoName: repo?.name,
              authorAssociation: issue?.author_association,
              forksCount: repo?.forks_count,
              stargazersCount: repo?.stargazers_count,
              languages: repo?.language,
              savedAt: currentDate,
              repoUrl: repo?.html_url,
              org: org,
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
            return;
          });
        } catch (error) {
          console.error(`Error fetching issues for repo ${repo.name}:`, error);
        }
      }
    } catch (error) {
      console.error(`Error fetching repositories for organization ${org}:`, error);
    }
  }
  console.log("DONE");
}
