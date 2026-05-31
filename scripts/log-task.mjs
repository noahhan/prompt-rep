import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const worklogDir = join(root, "worklog");
mkdirSync(worklogDir, { recursive: true });

const now = new Date();
const date = now.toISOString().slice(0, 10);
const textPath = join(worklogDir, `${date}-auto-log.txt`);

const [task = "Untitled task", summary = "", status = "done"] = process.argv.slice(2);

const entry = {
  time: now.toISOString(),
  task,
  status,
  summary
};

writeFileSync(textPath, `[${entry.time}] ${entry.status.toUpperCase()} - ${entry.task}\n${entry.summary}\n\n`, { flag: "a" });

console.log(`Logged task to ${textPath}`);
