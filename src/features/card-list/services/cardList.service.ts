import type { Promotion, Service } from '@types';
import { fetchJson } from '@shared/config/api';

export const fetchServicesByCompany = (companyId: number, search?: string, signal?: AbortSignal) => {
  const query = new URLSearchParams({ companyId: String(companyId) });
  if (search?.trim()) {
    query.set('q', search.trim());
  }
  return fetchJson<Service[]>(`/services?${query.toString()}`, { signal });
}

export const fetchPromotionsByCompany = (companyId: number, signal?: AbortSignal) => {
  const query = new URLSearchParams({ companyId: String(companyId), isActive: 'true' });
  return fetchJson<Promotion[]>(`/promotions?${query.toString()}`, { signal });
}
