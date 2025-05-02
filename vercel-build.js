// Build script for Vercel deployment
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔨 Starting Vercel build process...');

// Build the client application
try {
  console.log('📦 Building client application...');
  execSync('cd client && npm run build', { stdio: 'inherit' });
  console.log('✅ Client build completed successfully!');
} catch (error) {
  console.error('❌ Client build failed:', error);
  process.exit(1);
}

// Create public directory for static assets if it doesn't exist
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Copy client build to public directory
try {
  console.log('📂 Copying client build to public directory...');
  
  // Use cp-r equivalent in Node.js
  const copyRecursive = (src, dest) => {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    
    if (isDirectory) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      fs.readdirSync(src).forEach(childItemName => {
        copyRecursive(
          path.join(src, childItemName),
          path.join(dest, childItemName)
        );
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  };
  
  copyRecursive(
    path.join(process.cwd(), 'client', 'dist'),
    path.join(publicDir, 'client')
  );
  
  console.log('✅ Client files copied successfully!');
} catch (error) {
  console.error('❌ Failed to copy client build:', error);
  process.exit(1);
}

console.log('✅ Build process completed successfully!');