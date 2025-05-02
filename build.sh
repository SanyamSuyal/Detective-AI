#!/bin/bash

# Build the client (frontend)
echo "Building client..."
cd client
npm run build
cd ..

# Create the public directory if it doesn't exist
mkdir -p public/client

# Copy the client build to the public directory
echo "Copying client build to public/client directory..."
cp -r client/dist/* public/client/

echo "Build completed successfully!"