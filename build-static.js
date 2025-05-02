// This script builds the static frontend assets for deployment
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the public directory for static assets
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

try {
  // Build the Vite frontend
  console.log('Building frontend...');
  execSync('cd client && npx vite build', { stdio: 'inherit' });
  
  // Copy the built assets to the public directory
  console.log('Copying built assets...');
  fs.cpSync(path.join(__dirname, 'client', 'dist'), publicDir, { recursive: true });
  
  console.log('Static build completed successfully!');
} catch (error) {
  console.error('Static build failed:', error);
  process.exit(1);
}