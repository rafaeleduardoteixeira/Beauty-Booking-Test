

import { ToastProvider } from '@shared/toast';
import type { ProvidersProps } from './types';


export function Providers({ children }: ProvidersProps) {
  return (
    <ToastProvider>
      {children}
    </ToastProvider>
  );
}
