#!/bin/bash

# Build the frontend
npm run build

# Create uploads directory
mkdir -p uploads

# Copy client files to static directory
cp -r client/dist/* dist/

echo "Build completed successfully!"