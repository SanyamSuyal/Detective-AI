# Detective AI Web Application

A mystery-themed Detective AI website where users can submit case details and receive AI-generated insights with interactive visualizations.

## Features

- Submit case details for AI analysis
- Get detailed AI insights on cases
- File upload for evidence
- Interactive case results with visualizations
- Explore past cases
- Dark theme with detective-themed design

## Tech Stack

- Frontend: React, TypeScript, TailwindCSS, shadcn/ui
- Backend: Node.js, Express
- Database: PostgreSQL with Drizzle ORM
- AI Services: OpenAI GPT-4o, Cohere Command
- Authentication: Express Session with PostgreSQL session store

## Deployment to Vercel

### Prerequisites

1. A [Vercel](https://vercel.com) account
2. [PostgreSQL](https://neon.tech) database (Neon, Supabase, or other PostgreSQL provider)
3. [OpenAI API key](https://platform.openai.com/api-keys)
4. [Cohere API key](https://dashboard.cohere.com/api-keys)

### Steps to Deploy to Vercel

1. Fork or clone this repository to your GitHub account
2. Sign in to Vercel and click "New Project"
3. Import your GitHub repository
4. In the "Configure Project" step:
   - Add the following Environment Variables:
     - `DATABASE_URL`: Your PostgreSQL connection string
     - `OPENAI_API_KEY`: Your OpenAI API key
     - `COHERE_API_KEY`: Your Cohere API key
   - Make sure "Build and Output Settings" are using the defaults
   - Leave the root directory as `.` (root)
5. Click "Deploy" and wait for the deployment to complete
6. Once deployed, your application will be available at a `.vercel.app` domain

### Troubleshooting Vercel Deployment

- If you get a build error, check that all environment variables are set correctly
- For database connection issues:
  - Make sure your database allows connections from Vercel's IP ranges
  - Check that your connection string is correctly formatted
  - For Neon or other serverless PostgreSQL providers, use the pooled connection string
- For runtime errors:
  - Check the Function Logs in the Vercel dashboard
  - Make sure API keys are valid and have necessary permissions

### Handling Uploads

For file uploads to work in production, you'll need to:
1. Set up database storage for file metadata
2. Connect to a storage service like AWS S3 or Vercel Blob Storage
3. Update the storage configuration in the code

## Running Locally

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a `.env` file with the following environment variables:
   ```
   DATABASE_URL=your_postgres_connection_string
   OPENAI_API_KEY=your_openai_api_key
   COHERE_API_KEY=your_cohere_api_key
   ```
4. Run the database migrations with `npm run db:push`
5. Start the development server with `npm run dev`

## Project Structure

- `/client`: React frontend
- `/server`: Express backend
- `/db`: Database connection and seed script
- `/shared`: Shared schemas between frontend and backend
- `/uploads`: File uploads storage (in dev mode)