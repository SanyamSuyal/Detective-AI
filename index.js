// This file is for Vercel deployments
console.log('Starting Detective AI server...');

// This file simply re-exports the API handler
module.exports = require('./api/index.js');