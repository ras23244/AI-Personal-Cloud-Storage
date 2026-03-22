import { useNavigate } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import { Upload } from 'lucide-react';

const UploadPage = () => {
  const navigate = useNavigate();

  const handleUploadComplete = () => {
    navigate('/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
            <Upload className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Upload Document</h1>
            <p className="text-gray-600">
              Upload PDF files to make them searchable with AI
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <FileUpload onUploadComplete={handleUploadComplete} />

        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            What happens after upload?
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">1.</span>
              <span>Your document is securely stored in cloud storage</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">2.</span>
              <span>AI processes and extracts text content from your PDF</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">3.</span>
              <span>Content is split into semantic chunks for better search</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">4.</span>
              <span>Embeddings are generated using Google Gemini AI</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">5.</span>
              <span>Your document becomes searchable by meaning, not just keywords</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
