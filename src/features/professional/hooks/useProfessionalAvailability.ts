'use client';

import type { ProfessionalAvailability } from '@types';
import { useEffect, useState } from 'react';
import { fetchProfessionalAvailability } from '@features/booking/services/professionals.service';

interface UseProfessionalAvailabilityResult {
  availability: ProfessionalAvailability[];
  loading: boolean;
  error: string | null;
}

export const useProfessionalAvailability = (professionalId?: number): UseProfessionalAvailabilityResult => {
  const [availability, setAvailability] = useState<ProfessionalAvailability[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!professionalId) {
      setAvailability([]);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetchProfessionalAvailability(professionalId, controller.signal)
      .then((data) => setAvailability(data))
      .catch((err) => {
        if (controller.signal.aborted) return;
        console.error(err);
        setError('Unable to load availability.');
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [professionalId]);

  return { availability, loading, error };
}
