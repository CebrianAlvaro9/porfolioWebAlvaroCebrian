import { readFile } from "node:fs/promises";
import { test } from "node:test";
import assert from "node:assert/strict";

const workflowPath = new URL("../.github/workflows/deploy.yml", import.meta.url);
const workspaceConfigPath = new URL("../pnpm-workspace.yaml", import.meta.url);

test("GitHub Pages deployment uses pinned current actions and runtime", async () => {
  const workflow = await readFile(workflowPath, "utf8");

  assert.match(workflow, /uses:\s*actions\/checkout@v7/);
  assert.match(workflow, /uses:\s*withastro\/action@v6/);
  assert.match(workflow, /package-manager:\s*pnpm@12\.4\.2/);
  assert.match(workflow, /node-version:\s*24/);
  assert.match(workflow, /uses:\s*actions\/deploy-pages@v5/);
});

test("pnpm explicitly allows the build script required by Astro", async () => {
  const workspaceConfig = await readFile(workspaceConfigPath, "utf8");

  assert.match(workspaceConfig, /allowBuilds:\s*\n\s+esbuild:\s*true/);
});
