#!/usr/bin/env node
/** Used by git filter-branch --msg-filter to remove Cursor co-author lines */
let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  input += chunk;
});
process.stdin.on("end", () => {
  const cleaned = input
    .split(/\r?\n/)
    .filter(
      (line) =>
        !line.includes("Co-authored-by: Cursor") &&
        !line.includes("cursoragent@cursor.com"),
    )
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trimEnd();
  process.stdout.write(cleaned ? `${cleaned}\n` : "");
});
