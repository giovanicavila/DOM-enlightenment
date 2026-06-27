import { execSync } from "node:child_process";

try {
  execSync("git checkout main", { cwd: process.cwd(), encoding: "utf-8" });
  execSync("git pull origin main", { cwd: process.cwd(), encoding: "utf-8" });
  execSync("git merge origin/develop", { cwd: process.cwd(), encoding: "utf-8" });
  execSync("git push origin main", { cwd: process.cwd(), encoding: "utf-8" });
  execSync("git checkout develop", { cwd: process.cwd(), encoding: "utf-8" });
  console.log("✅ develop merged into main and pushed!");
} catch (err) {
  console.error("❌ Merge failed:", err.stderr || err.message);
  process.exit(1);
}
