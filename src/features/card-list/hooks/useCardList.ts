'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Promotion, Service } from '@types';
import { fetchPromotionsByCompany, fetchServicesByCompany } from '../services/cardList.service';

export interface ServiceCardEntry {
  service: Service;
  promotion?: Promotion;
}

interface UseCardListResult {
  cards: ServiceCardEntry[];
  loading: boolean;
  error: string | null;
}

export const useCardList = (companyId?: number, search?: string): UseCardListResult => {
  const [cards, setCards] = useState<ServiceCardEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!companyId) {
      setCards([]);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    Promise.all([
      fetchServicesByCompany(companyId, search, controller.signal),
      fetchPromotionsByCompany(companyId, controller.signal),
    ])
      .then(([services, promotions]) => {
        const promoMap = new Map<number, Promotion>();
        promotions.forEach((promo) => {
          if (promo.isActive) {
            promoMap.set(promo.serviceId, promo);
          }
        });
        setCards(
          services.map((service) => ({
            service,
            promotion: promoMap.get(service.id),
          })),
        );
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        console.error(err);
        setError('Unable to load services right now.');
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [companyId, search]);

  return useMemo(
    () => ({
      cards,
      loading,
      error,
    }),
    [cards, loading, error],
  );
}
