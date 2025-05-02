#!/bin/bash

# Build the client (frontend)
echo "Building client..."
cd client
npm run build
cd ..

# Create the public directory if it doesn't exist
mkdir -p public

# Copy the client build to the public directory
echo "Copying client build to public directory..."
cp -r client/dist/* public/

echo "Build completed successfully!"