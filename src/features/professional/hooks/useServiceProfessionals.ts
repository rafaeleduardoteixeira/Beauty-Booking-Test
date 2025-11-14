'use client';

import type { Professional } from '@types';
import { useEffect, useState } from 'react';
import { fetchProfessionalsByService } from '../../booking/services/professionals.service';

interface UseServiceProfessionalsResult {
  professionals: Professional[];
  loading: boolean;
  error: string | null;
}

export const useServiceProfessionals = (serviceId?: number): UseServiceProfessionalsResult => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!serviceId) {
      setProfessionals([]);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetchProfessionalsByService(serviceId, controller.signal)
      .then((data) => setProfessionals(data))
      .catch((err) => {
        if (controller.signal.aborted) return;
        console.error(err);
        setError('Unable to load professionals.');
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [serviceId]);

  return { professionals, loading, error };
}
