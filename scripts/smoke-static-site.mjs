import { createServer, get as httpGet } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";

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

async function fetchText(url) {
  return new Promise((resolve, reject) => {
    const req = httpGet(url, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => resolve({ status: res.statusCode, body: data }));
    });
    req.on("error", reject);
  });
}

async function smoke(baseUrl) {
  const checks = [
    { label: "index.html returns 200", fn: async () => {
      const { status } = await fetchText(baseUrl);
      if (status !== 200) throw new Error(`Expected 200, got ${status}`);
    }},
    { label: "path traversal blocked (403)", fn: async () => {
      const { status } = await fetchText(baseUrl.replace("index.html", "../../../etc/passwd"));
      if (status !== 403) throw new Error(`Expected 403, got ${status}`);
    }},
    { label: "404 for unknown file", fn: async () => {
      const { status } = await fetchText(baseUrl.replace("index.html", "__nonexistent__.html"));
      if (status !== 404) throw new Error(`Expected 404, got ${status}`);
    }},
  ];

  for (const { label, fn } of checks) {
    try {
      await fn();
      console.log(`  ✓ ${label}`);
    } catch (err) {
      console.error(`  ✗ ${label}: ${err.message}`);
      throw err;
    }
  }
}

const { server, port } = await startStaticServer();
try {
  const baseUrl = `http://127.0.0.1:${port}/index.html`;
  await smoke(baseUrl);
  console.log("✓ Smoke OK");
} finally {
  await new Promise((resolve) => server.close(resolve));
}
