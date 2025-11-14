'use client';

import type { ReactNode } from 'react';
import { ToastContainer, ToastContainerProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastProviderProps {
  children: ReactNode;
  containerProps?: ToastContainerProps;
}

export const ToastProvider = ({ children, containerProps }: ToastProviderProps) => {
  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        draggable
        newestOnTop={false}
        theme="light"
        {...containerProps}
      />
    </>
  );
}
