#!/usr/bin/env node
import { spawn, exec } from "node:child_process";

const URL = "http://localhost:3000";
let opened = false;

console.log("Starting web dev server and will open browser when ready...");

const dev = spawn("pnpm", ["--filter", "web", "run", "dev"], {
  shell: false,
});

dev.stdout.on("data", (chunk) => {
  const text = String(chunk);
  process.stdout.write(text);

  if (
    !opened &&
    (text.includes("Local:") || text.includes("Ready in") || text.includes(URL))
  ) {
    opened = true;
    // Open the browser in a cross-platform way
    if (process.platform === "win32") {
      // start requires cmd
      exec(`start ${URL}`);
    } else if (process.platform === "darwin") {
      exec(`open ${URL}`);
    } else {
      exec(`xdg-open ${URL}`);
    }
  }
});

dev.stderr.on("data", (chunk) => {
  process.stderr.write(String(chunk));
});

dev.on("close", (code) => {
  console.log(`dev server exited with code ${code}`);
  process.exit(code);
});
