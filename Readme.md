

https://github.com/user-attachments/assets/bd88cfa8-5eca-48fa-9b4d-f8538ff7595d






# AI Personal Cloud Storage

A full-stack AI-powered document upload, processing, and semantic search platform. Users can register, upload PDF files, and search documents by meaning using AI embeddings stored in a vector database.

## Project Overview

This repository contains three main parts:

- `backend/` - Node.js + Express API, MongoDB metadata store, authentication, presigned upload/download URLs, file processing queue, Pinecone search integration.
- `client/project/` - React + Vite frontend with authentication, file upload UI, file dashboard, search page, and document viewer integration.
- `docling-service/` - Python FastAPI service that downloads uploaded files, parses text, and chunks documents for embedding generation.

## Key Features

- User registration and login with JWT auth
- Secure file uploads via Cloudflare R2 presigned URLs
- File metadata persistence in MongoDB
- Background processing queue using BullMQ and Redis
- Document parsing and chunking via a Python service
- AI embeddings generation using Google Gemini
- Vector search powered by Pinecone
- Semantic search results grouped and ranked by document relevance
- Download URLs for processed files

## Architecture

1. User uploads a PDF from the React frontend.
2. Frontend requests a presigned upload URL from the backend.
3. File is uploaded directly to Cloudflare R2.
4. Backend stores file metadata and enqueues a processing job.
5. Worker downloads the file from R2, sends it to the Python parser service, generates embeddings, and upserts vectors to Pinecone.
6. User performs semantic search; backend converts query to an embedding and queries Pinecone.

## Folder Structure

```
backend/
  app.js
  server.js
  package.json
  config/
    mongo.js
    pinecone.js
    redis.js
    r2Client.js
  controllers/
    authController.js
    fileController.js
    searchController.js
    uploadController.js
  middleware/
    authMiddleware.js
  models/
    authModel.js
    File.js
  queues/
    fileProcessingQueue.js
  routes/
    authRoute.js
    fileRoute.js
    searchRoute.js
    uploadRoute.js
  services/
    embeddingService.js
    fileSearchService.js
    presignedDownloadService.js
    presignedService.js
  worker/
    fileProcessor.js

client/project/
  README.md
  package.json
  src/
    App.jsx
    main.jsx
    index.css
    components/
    config/api.js
    context/AuthContext.jsx
    pages/
    services/api.js
    utils/dateUtils.js

docling-service/
  app.py
  parser.py
  requirements.txt
```

## Backend Setup

### Prerequisites

- Node.js 18+ installed
- MongoDB instance available
- Redis instance available
- Cloudflare R2 account
- Pinecone account
- Google Gemini API key
- Python 3.11+ installed for the docling service

### Install Dependencies

From `backend/`:

```bash
cd backend
npm install
```

### Environment Variables

Create a `.env` file in `backend/` and provide these values:

```bash
MONGO_URI=mongodb://localhost:27017/AICloudStorage
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
R2_ACCOUNT_ID=your_r2_account_id
R2_BUCKET_NAME=your_r2_bucket_name
R2_ACCESS_KEY_ID=your_r2_access_key
R2_SECRET_ACCESS_KEY=your_r2_secret_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=your_pinecone_index_name
GEMINI_API_KEY=your_google_gemini_api_key
REDIS_HOST=localhost
REDIS_PORT=6379
```

### Run Backend

Start the backend server:

```bash
npm run dev
```

The API listens on `http://localhost:3000` by default.

## Frontend Setup

### Install Dependencies

From `client/project/`:

```bash
cd client/project
npm install
```

### Environment Variables

Create a `.env` file in `client/project/` with:

```bash
VITE_API_BASE_URL=http://localhost:3000
```

### Run Frontend

```bash
npm run dev
```

Open the app in your browser at the URL shown by Vite, typically `http://localhost:5173`.

## Docling Service Setup

### Install Dependencies

From `docling-service/`:

```bash
cd docling-service
pip install -r requirements.txt
```

### Run Docling Service

```bash
python app.py
```

This service starts on `http://localhost:8000` and exposes a `/parse` endpoint used by the backend worker.

## API Endpoints

### Authentication

- `POST /user/register` - Register a new user
- `POST /user/login` - Login and retrieve a JWT token

### File Upload

- `POST /upload/upload-url` - Request a presigned R2 upload URL
- `POST /upload/upload-complete` - Notify backend after upload finishes

### File Management

- `GET /files/allfiles` - List all uploaded files for the authenticated user
- `GET /files/:fileId` - Get metadata for a single file
- `GET /files/:fileId/url` - Generate a temporary download URL for a file

### Search

- `POST /search/content` - Perform semantic search for the authenticated user

## Important Implementation Notes

- The backend starts a BullMQ worker via `backend/worker/fileProcessor.js`.
- The worker downloads files from R2, sends them to the Python parser service, and stores chunk embeddings in Pinecone.
- `backend/services/embeddingService.js` uses Google Gemini `gemini-embedding-001`.
- Document parsing and chunking is handled by `docling-service/parser.py` using `docling.document_converter.DocumentConverter` and `docling.chunking.HybridChunker`.

## Development Tips

- Ensure Redis is running before starting the backend worker.
- Ensure the docling service is running on `localhost:8000` before processing uploads.
- Use the backend console logs to verify file processing progress and Pinecone upserts.

## Notes

- The frontend already includes a modern React UI with authentication, file listing, uploading, search UI, and a PDF viewer placeholder.
- The backend supports secure user-specific search filtering and file URL generation.
- The architecture separates upload, processing, and search concerns for better scalability.

## License

This project currently does not include a license file.
