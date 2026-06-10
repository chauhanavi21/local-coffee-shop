import fs from "fs";
import path from "path";

const root = process.cwd();
const gitDir = path.join(root, ".git");
const src = path.join(root, ".githooks", "prepare-commit-msg");
const dest = path.join(gitDir, "hooks", "prepare-commit-msg");

if (!fs.existsSync(gitDir) || !fs.existsSync(src)) {
  process.exit(0);
}

fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.copyFileSync(src, dest);
fs.chmodSync(dest, 0o755);
