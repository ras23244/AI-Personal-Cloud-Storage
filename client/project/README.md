# AI-Powered Semantic Document Search

A modern, production-grade web application for semantic document search using AI embeddings. Upload PDF documents and search them by meaning, not just keywords.

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Secure session management

### Document Management
- PDF upload with drag-and-drop support
- Real-time upload progress tracking
- Document status monitoring (uploading, processing, processed, failed)
- Automatic retry for failed processing
- File metadata display

### Semantic Search
- AI-powered semantic search using Google Gemini embeddings
- Search by meaning and context, not just keywords
- Relevance scoring for results
- Highlighted text snippets showing why documents matched
- Multiple matching sections per document

### Document Viewer
- Detailed file view with metadata
- Display of relevant matching sections
- Similarity scores for each match
- PDF viewer placeholder (ready for integration)

### UI/UX
- Clean, modern SaaS-style interface
- Fully responsive design (mobile, tablet, desktop)
- Loading states and error handling
- Toast notifications
- Smooth animations and transitions
- Mobile-friendly navigation

## Tech Stack

### Frontend
- React 19
- React Router DOM (routing)
- Tailwind CSS (styling)
- Axios (API calls)
- Lucide React (icons)
- Vite (build tool)

### Backend (Already Implemented)
- Node.js + Express
- MongoDB (metadata)
- BullMQ + Redis (job queue)
- Python FastAPI (document parsing)
- Google Gemini Embeddings API
- Pinecone (vector database)
- R2 Cloud Storage

## Project Structure

```
src/
├── components/
│   ├── FileList.jsx          # Display list of uploaded files
│   ├── FileUpload.jsx         # Drag-and-drop file upload
│   ├── Layout.jsx             # Main layout wrapper
│   ├── MobileMenu.jsx         # Mobile navigation menu
│   ├── ProtectedRoute.jsx     # Route protection wrapper
│   ├── SearchBar.jsx          # Search input component
│   ├── SearchResults.jsx      # Display search results
│   ├── Sidebar.jsx            # Desktop navigation sidebar
│   └── Toast.jsx              # Notification component
├── config/
│   └── api.js                 # API configuration
├── context/
│   └── AuthContext.jsx        # Authentication context
├── pages/
│   ├── Dashboard.jsx          # Main dashboard (file list)
│   ├── FileDetail.jsx         # Individual file view
│   ├── Login.jsx              # Login page
│   ├── SearchPage.jsx         # Semantic search page
│   ├── Signup.jsx             # Registration page
│   └── UploadPage.jsx         # File upload page
├── services/
│   └── api.js                 # API service layer
├── utils/
│   └── dateUtils.js           # Date formatting utilities
├── App.jsx                    # Root component with routing
├── index.css                  # Global styles
└── main.jsx                   # Entry point
```

## API Endpoints

The frontend integrates with these backend endpoints:

### Authentication
- `POST /user/register` - Create new account
- `POST /user/login` - User login

### File Management
- `POST /upload/upload-url` - Get signed upload URL
- `POST /upload/upload-complete` - Mark upload complete
- `GET /files` - Get user's files
- `GET /files/:fileId` - Get file details
- `POST /files/:fileId/retry` - Retry failed processing

### Search
- `POST /search/content` - Semantic search query

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Backend API running (see backend setup)
- API base URL configured

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and set:
```
VITE_API_BASE_URL=http://localhost:3000
```

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Configuration

### Environment Variables

- `VITE_API_BASE_URL` - Backend API base URL (default: http://localhost:3000)

### API Configuration

Edit `src/config/api.js` to customize API endpoints if needed.

## How It Works

### Upload Flow
1. User uploads PDF file
2. Frontend requests signed upload URL from backend
3. File is uploaded directly to R2 cloud storage
4. Backend is notified of upload completion
5. Background job processes the file:
   - Downloads file
   - Parses text content
   - Chunks content semantically
   - Generates 3072-dimension embeddings
   - Stores in Pinecone vector database
6. File status updates in real-time

### Search Flow
1. User enters search query
2. Query is converted to embedding vector
3. Pinecone returns top matching chunks
4. Results are grouped by file
5. Files are ranked by:
   - Average similarity score
   - Maximum similarity score
   - Number of matching chunks
6. Top 10 results displayed with snippets

## Key Features Explained

### Semantic Search vs Keyword Search

Traditional keyword search looks for exact word matches. Semantic search understands meaning and context.

Example:
- Query: "financial projections for Q4"
- Matches documents about: quarterly forecasts, revenue predictions, fiscal planning
- Even if they don't contain those exact words

### Relevance Scoring

Each file gets a relevance score based on:
- How similar the content is to the query (0-100%)
- Number of relevant sections found
- Quality of the best matches

### Text Highlighting

Search results show snippets of relevant text with:
- Visual highlighting of key terms
- Context around matches
- Similarity percentage for each snippet

## Responsive Design

The application is fully responsive:
- Desktop: Sidebar navigation + full layout
- Tablet: Optimized spacing and layout
- Mobile: Hamburger menu + touch-friendly controls

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Modern mobile browsers

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

- ESLint configured for React
- Tailwind CSS for styling
- Functional components with hooks
- Modern ES6+ syntax

## Production Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy the `dist/` folder to your hosting provider:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront
   - Any static hosting service

3. Configure environment variables on your hosting platform

4. Ensure backend API is accessible from production domain

## Future Enhancements

- Full PDF viewer with highlighted sections
- Batch file upload
- Advanced filters (date, file type, size)
- Export search results
- Sharing and collaboration features
- OCR for scanned documents
- Support for more file types (DOCX, TXT, etc.)

## License

This project is private and proprietary.

## Support

For issues or questions, contact the development team.
