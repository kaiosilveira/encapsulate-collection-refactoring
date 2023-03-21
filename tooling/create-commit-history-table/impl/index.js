export async function fetchReversedOneLineCommitHistory({ exec }) {
  return new Promise((resolve, reject) => {
    exec('git log --oneline --reverse --no-abbrev-commit', (err, stdout) => {
      if (err) {
        reject(err);
      } else {
        const commits = stdout.split('\n').map((commit) => {
          const firstSpaceIdx = commit.indexOf(' ');
          const [sha, msg] = [commit.substring(0, firstSpaceIdx), commit.substring(firstSpaceIdx + 1)];
          return { sha, msg };
        }).filter(({ sha }) => sha !== '');

        resolve(commits);
      }
    });
  });
}

export function createCommitHistoryTableHeaders() {
  return [
    '| Commit SHA | Message |',
    '| ---------- | ------- |'
  ].join('\n');
}

export function createCommitHistoryTableRow(repoName, { sha, msg }) {
  const cmtURL = `https://github.com/kaiosilveira/${repoName}/commit/${sha}`;
  return `| [${sha.slice(0, 7)}](${cmtURL}) | ${msg} |`;
}
