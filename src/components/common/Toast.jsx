import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toast, setToast } = useApp();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 size={18} className="text-emerald-400" />;
      case 'warning':
        return <AlertCircle size={18} className="text-amber-400" />;
      default:
        return <Info size={18} className="text-indigo-400" />;
    }
  };

  return (
    <div className="toast-container">
      <div className={`toast-box ${toast.type || 'info'}`}>
        {getIcon()}
        <span>{toast.message}</span>
        <button
          onClick={() => setToast(null)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'inherit',
            cursor: 'pointer',
            marginLeft: '8px',
            opacity: 0.7
          }}
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
};
