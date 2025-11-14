'use client';

import { useEffect, useState } from 'react';
import type { Service } from '@types';
import { fetchServiceById } from '../services/service.service';

export const useServicePage = (serviceId: string) => {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadService = async () => {
      try {
        setLoading(true);
        const data = await fetchServiceById(serviceId);
        setService(data);
      } catch (err) {
        setError('Service not found');
      } finally {
        setLoading(false);
      }
    };

    loadService();
  }, [serviceId]);

  return { service, loading, error };
};
