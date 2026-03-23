import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { fileService } from '../services/api';
import { FileText, ArrowLeft, Loader as Loader2, Download, Calendar } from 'lucide-react';
import { formatDistanceToNow } from '../utils/dateUtils';
import PdfViewer from '../components/PdfViewer';

const FileDetail = () => {
  const { fileId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const searchQuery = location.state?.searchQuery;
  const matchingChunks = location.state?.matchingChunks || [];

  useEffect(() => {
    const fetchFile = async () => {
      try {
        setLoading(true);
        const data = await fileService.getFile(fileId);
        setFile(data.file);
      } catch (err) {
        setError('Failed to load file');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFile();
  }, [fileId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
      </div>
    );
  }

  if (error || !file) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error || 'File not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-red-50 rounded-xl flex items-center justify-center ">
              <FileText className="w-8 h-8 text-red-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 mb-2 ">
                {file.fileName}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Uploaded {formatDistanceToNow(file.createdAt)}
                </span>
                {file.size && (
                  <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                )}
              </div>
            </div>
            {file.downloadUrl && (
              <a
                href={file.downloadUrl}
                download
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            )}
          </div>
        </div>

        {matchingChunks.length > 0 && (
          <div className="border-b border-gray-200 bg-primary-50 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Relevant Sections {searchQuery && `for "${searchQuery}"`}
            </h2>
            <div className="space-y-3">
              {matchingChunks.map((chunk, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-primary-200 rounded-lg p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-primary-700">
                      Match {idx + 1}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-600">
                      {Math.round(chunk.score * 100)}% similarity
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{chunk.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}


          <div className="p-6">
            <PdfViewer fileId={fileId} />
        
        </div>
      </div>
    </div>
  );
};

export default FileDetail;
