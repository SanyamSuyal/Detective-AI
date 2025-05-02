#!/usr/bin/env node

import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Create a public directory inside dist if it doesn't exist
if (!fs.existsSync('dist/public')) {
  fs.mkdirSync('dist/public');
}

try {
  // Build the client (frontend)
  console.log('Building frontend...');
  
  // Use vite build from the root to ensure all path aliases work
  execSync('npx vite build', { stdio: 'inherit' });
  
  // Copy client/dist to dist/public
  console.log('Copying frontend assets...');
  // Use fs.cp instead of fs.cpSync for Node.js compatibility
  fs.cp('client/dist', 'dist/public', { recursive: true }, (err) => {
    if (err) {
      console.error('Error copying files:', err);
      process.exit(1);
    }
    
    // Build the server (backend) with esbuild after copying is complete
    console.log('Building backend...');
    try {
      execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', 
        { stdio: 'inherit' });
      console.log('Build completed successfully!');
    } catch (err) {
      console.error('Backend build failed:', err);
      process.exit(1);
    }
  });
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}