'use client';

import { useEffect } from 'react';
import { setupAxiosInterceptors } from '../../../../helpers/axiosSetup';

export function AxiosInterceptor({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    setupAxiosInterceptors();
  }, []);

  return <>{children}</>;
}