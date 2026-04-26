import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, X, Loader2 } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'loading' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  addToast: (type: ToastType, message: string) => string;
  removeToast: (id: string) => void;
  updateToast: (id: string, type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    
    // Auto-remove after 3 seconds if not loading
    if (type !== 'loading') {
      setTimeout(() => removeToast(id), 3000);
    }
    
    return id;
  }, [removeToast]);

  const updateToast = useCallback((id: string, type: ToastType, message: string) => {
    setToasts((prev) => 
      prev.map((toast) => toast.id === id ? { ...toast, type, message } : toast)
    );
    
    if (type !== 'loading') {
      setTimeout(() => removeToast(id), 3000);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast, updateToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-2xl backdrop-blur-xl ${
                toast.type === 'success' ? 'bg-emerald-950/80 border-emerald-500/20 text-emerald-400' :
                toast.type === 'error' ? 'bg-red-950/80 border-red-500/20 text-red-400' :
                toast.type === 'loading' ? 'bg-blue-950/80 border-blue-500/20 text-blue-400' :
                'bg-gray-900/80 border-white/10 text-white'
              }`}
            >
              {toast.type === 'success' && <CheckCircle2 size={18} />}
              {toast.type === 'error' && <AlertCircle size={18} />}
              {toast.type === 'loading' && <Loader2 size={18} className="animate-spin" />}
              
              <span className="text-sm font-bold tracking-wide">{toast.message}</span>
              
              {toast.type !== 'loading' && (
                <button 
                  onClick={() => removeToast(toast.id)}
                  className="ml-4 p-1 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
