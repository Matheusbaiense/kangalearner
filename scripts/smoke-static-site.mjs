import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, resolve, sep } from "node:path";

const root = process.cwd();

function contentTypeForPath(p) {
  switch (extname(p).toLowerCase()) {
    case ".html":
      return "text/html; charset=utf-8";
    case ".css":
      return "text/css; charset=utf-8";
    case ".js":
      return "text/javascript; charset=utf-8";
    case ".svg":
      return "image/svg+xml";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".webp":
      return "image/webp";
    default:
      return "application/octet-stream";
  }
}

async function startStaticServer() {
  const rootResolved = resolve(root);

  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url || "/", "http://localhost");
      const rawPath = decodeURIComponent(url.pathname);
      const safePath = rawPath === "/" ? "/index.html" : rawPath;
      const filePath = resolve(root, safePath.replace(/^\/+/, ""));
      // Reject any path that escapes the project root after normalisation.
      if (!filePath.startsWith(rootResolved + sep) && filePath !== rootResolved) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
      }
      const buf = await readFile(filePath);
      res.writeHead(200, { "content-type": contentTypeForPath(filePath) });
      res.end(buf);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  });

  await new Promise((resolve) => server.listen(0, resolve));
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("Failed to bind server");
  return { server, port: address.port };
}

function runPuppeteer(url) {
  return new Promise((resolve, reject) => {
    const runnerPath = join(root, "scripts", "smoke-static-site.puppeteer.mjs");
    const child = spawn(process.execPath, [runnerPath, url], { stdio: "inherit" });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Smoke failed (exit ${code})`));
    });
  });
}

const { server, port } = await startStaticServer();
try {
  const baseUrl = `http://127.0.0.1:${port}/index.html`;
  await runPuppeteer(baseUrl);
  console.log("✓ Smoke OK");
} finally {
  await new Promise((resolve) => server.close(resolve));
}
