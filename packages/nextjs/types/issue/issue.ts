export interface Issue {
  _id: string;
  number: number;
  title: string;
  labels: string[];
  assignee: string[];
  createdAt: string;
  updatedAt: string;
  savedAt: string;
  state: string;
  htmlUrl: string;
  repoName: string;
  authorAssociation: string;
  forksCount: string;
  stargazersCount: string;
  languages: string[];
  repoUrl: string;
}
