// Vercel build. Convex's generated client (src/convex/_generated) is gitignored,
// so when it's absent we write a thin stub so the bundle can build. Once a real
// Convex deployment exists, run `npx convex deploy --cmd "npm run build"` (or
// commit/generate the real files) and this stub is skipped.
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";

const dir = "src/convex/_generated";
if (!existsSync(`${dir}/api.js`) && !existsSync(`${dir}/api.ts`)) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(
    `${dir}/api.ts`,
    'import { anyApi } from "convex/server";\nexport const api: any = anyApi;\nexport const internal: any = anyApi;\n',
  );
  console.log("[vercel-build] wrote stub Convex api (no generated client found)");
}
execSync("npx vite build", { stdio: "inherit" });
