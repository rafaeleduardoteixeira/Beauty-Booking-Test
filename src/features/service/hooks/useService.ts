'use client';

import { useEffect, useState } from 'react';
import type { Service } from '@types';
import { fetchServiceById } from '../services/service.service';

interface UseServiceReturn {
  service: Service | null;
  loading: boolean;
  error: string | null;
}

export const useService = (serviceId?: string): UseServiceReturn => {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!serviceId) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function loadService() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchServiceById(serviceId!);
        setService(data);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    loadService();

    return () => {
      controller.abort();
    };
  }, [serviceId]);

  return { service, loading, error };
}
