'use client';

import { toast } from 'react-toastify';

export function useToast() {
  return {
    success: toast.success,
    error: toast.error,
    info: toast.info,
    warn: toast.warn,
    promise: toast.promise,
    dismiss: toast.dismiss,
  };
}
