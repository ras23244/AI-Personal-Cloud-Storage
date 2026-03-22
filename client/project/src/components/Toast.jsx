import { useEffect } from 'react';
import { CircleCheck as CheckCircle, Circle as XCircle, Info, X } from 'lucide-react';

const Toast = ({ type = 'info', message, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const types = {
    success: {
      icon: CheckCircle,
      className: 'bg-green-50 border-green-200 text-green-800',
      iconClassName: 'text-green-600',
    },
    error: {
      icon: XCircle,
      className: 'bg-red-50 border-red-200 text-red-800',
      iconClassName: 'text-red-600',
    },
    info: {
      icon: Info,
      className: 'bg-blue-50 border-blue-200 text-blue-800',
      iconClassName: 'text-blue-600',
    },
  };

  const config = types[type] || types.info;
  const Icon = config.icon;

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-md border rounded-lg shadow-lg p-4 flex items-start gap-3 ${config.className} animate-slide-in`}
    >
      <Icon className={`w-5 h-5 ${config.iconClassName}`} />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="hover:opacity-70 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
