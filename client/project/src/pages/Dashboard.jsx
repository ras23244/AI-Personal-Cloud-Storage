import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FileList from '../components/FileList';
import { fileService } from '../services/api';
import { Loader as Loader2, FileText } from 'lucide-react';

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const data = await fileService.getFiles();
      setFiles(data.files || []);
    } catch (err) {
      setError('Failed to load files');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFiles();

    const interval = setInterval(() => {
      setFiles((prevFiles) => {
        const hasProcessingFiles = prevFiles.some(
          (f) => f.stage === 'uploading' || f.stage === 'processing'
        );

        if (hasProcessingFiles) {
          fetchFiles();
        }

        return prevFiles;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleFileClick = (file) => {
    navigate(`/file/${file._id}`);
  };

  const handleRetry = async (fileId) => {
    try {
      await fileService.retryProcessing(fileId);
      fetchFiles();
    } catch (err) {
      console.error('Retry failed:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Documents</h1>
        <p className="text-gray-600">
          Manage and search through your uploaded documents
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <FileList
            files={files}
            onFileClick={handleFileClick}
            onRetry={handleRetry}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
