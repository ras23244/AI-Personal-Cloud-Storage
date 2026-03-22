import { FileText, Clock, CircleCheck as CheckCircle, Circle as XCircle, RefreshCw, Loader as Loader2 } from 'lucide-react';
import { formatDistanceToNow } from '../utils/dateUtils';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    uploading: {
      icon: Loader2,
      text: 'Uploading',
      className: 'bg-blue-100 text-blue-700 border-blue-200',
      iconClassName: 'animate-spin',
    },
    processing: {
      icon: Loader2,
      text: 'Processing',
      className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      iconClassName: 'animate-spin',
    },
    processed: {
      icon: CheckCircle,
      text: 'Processed',
      className: 'bg-green-100 text-green-700 border-green-200',
      iconClassName: '',
    },
    failed: {
      icon: XCircle,
      text: 'Failed',
      className: 'bg-red-100 text-red-700 border-red-200',
      iconClassName: '',
    },
  };

  const config = statusConfig[status] || statusConfig.processing;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${config.className}`}
    >
      <Icon className={`w-3.5 h-3.5 ${config.iconClassName}`} />
      {config.text}
    </span>
  );
};

const FileList = ({ files, onFileClick, onRetry }) => {
  if (files.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No documents yet</h3>
        <p className="text-gray-600">Upload your first PDF to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {files.map((file) => (
        <div
          key={file._id}
          className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer group"
          onClick={() => file.stage === 'processed' && onFileClick(file)}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center  group-hover:bg-red-100 transition-colors">
              <FileText className="w-6 h-6 text-red-600" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-base font-medium text-gray-900 truncate group-hover:text-primary-600 transition-colors">
                  {file.fileName}
                </h3>
                <StatusBadge status={file.stage} />
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {formatDistanceToNow(file.createdAt)}
                </span>
                {file.size && (
                  <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                )}
              </div>

              {file.stage === 'processing' && (
                <div className="mt-3">
                  <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                    <span>Processing document...</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-yellow-500 h-1.5 rounded-full animate-pulse-slow w-2/3" />
                  </div>
                </div>
              )}

              {file.stage === 'failed' && (
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-sm text-red-600">Processing failed</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRetry(file._id);
                    }}
                    className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Retry
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileList;
