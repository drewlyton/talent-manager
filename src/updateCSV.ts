import { Octokit } from "octokit";
import { env } from "./env";

const octokit = new Octokit({
  auth: env.GITHUB_TOKEN,
});

type GitRef = {
  type: "dir" | "file" | "submodule" | "symlink";
  size: number;
  name: string;
  path: string;
  content?: string | undefined;
  sha: string;
  url: string;
  git_url: string | null;
  html_url: string | null;
  download_url: string | null;
};

const path = env.PROD ? "emails.csv" : "emails-test.csv";

export async function updateCSV(email: string) {
  const getFile = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: env.GITHUB_REPO_OWNER,
      repo: env.GITHUB_REPO_NAME,
      path,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );
  const fileRef = getFile.data as GitRef;
  const fileSHA = fileRef.sha;
  const fileContent = atob(fileRef?.content || "");

  await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
    owner: env.GITHUB_REPO_OWNER,
    repo: env.GITHUB_REPO_NAME,
    path,
    message: `${email} added`,
    content: btoa(fileContent + `\n${email},`),
    sha: fileSHA,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
}
