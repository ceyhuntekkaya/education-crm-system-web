'use client';

import { useState, useCallback } from 'react';
import type { ToastData } from '@/components/ui/toast';

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((toast: Omit<ToastData, 'id'>) => {
    const newToast: ToastData = {
      ...toast,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    setToasts(prev => [...prev, newToast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Convenience methods
  const success = useCallback((title: string, message?: string, options?: Partial<Omit<ToastData, 'id' | 'type' | 'title' | 'message'>>) => {
    addToast({ type: 'success', title, message, ...options });
  }, [addToast]);

  const error = useCallback((title: string, message?: string, options?: Partial<Omit<ToastData, 'id' | 'type' | 'title' | 'message'>>) => {
    addToast({ type: 'error', title, message, ...options });
  }, [addToast]);

  const warning = useCallback((title: string, message?: string, options?: Partial<Omit<ToastData, 'id' | 'type' | 'title' | 'message'>>) => {
    addToast({ type: 'warning', title, message, ...options });
  }, [addToast]);

  const info = useCallback((title: string, message?: string, options?: Partial<Omit<ToastData, 'id' | 'type' | 'title' | 'message'>>) => {
    addToast({ type: 'info', title, message, ...options });
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    success,
    error,
    warning,
    info,
  };
};

export default useToast;
