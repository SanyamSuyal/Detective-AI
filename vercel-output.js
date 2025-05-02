// Create Vercel output directory structure
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Create output directory
const outputDir = path.join(process.cwd(), '.vercel', 'output');
fs.mkdirSync(outputDir, { recursive: true });

// Create static directory for client files
const staticDir = path.join(outputDir, 'static');
fs.mkdirSync(staticDir, { recursive: true });

// Build client
console.log('Building client...');
execSync('cd client && npm run build', { stdio: 'inherit' });

// Copy client build to static directory
console.log('Copying client files to static output...');
fs.cpSync(path.join(process.cwd(), 'client', 'dist'), staticDir, { recursive: true });

// Create functions directory for API
const functionsDir = path.join(outputDir, 'functions');
fs.mkdirSync(functionsDir, { recursive: true });

// Create API function directory
const apiDir = path.join(functionsDir, 'api');
fs.mkdirSync(apiDir, { recursive: true });

// Create API function handler
console.log('Creating API function handler...');
fs.writeFileSync(path.join(apiDir, 'index.func', '.vc-config.json'), JSON.stringify({
  runtime: "nodejs18.x",
  handler: "index.js",
  launcherType: "Nodejs"
}));

// Build API function
console.log('Building API function...');
execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=.vercel/output/functions/api/index.func/index.js', { stdio: 'inherit' });

// Create config.json
console.log('Creating Vercel config...');
fs.writeFileSync(path.join(outputDir, 'config.json'), JSON.stringify({
  version: 3,
  routes: [
    { src: "^/api/(.*)$", dest: "/api" },
    { src: "^/uploads/(.*)$", dest: "/api" },
    { handle: "filesystem" },
    { src: "^/(.*)$", dest: "/api" }
  ]
}));

console.log('Vercel output created successfully!');