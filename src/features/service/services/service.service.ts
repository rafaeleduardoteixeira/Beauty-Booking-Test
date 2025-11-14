import type { Service } from '@types';
import { fetchJson } from '@shared/config/api';

export const fetchServiceById = async (serviceId: string): Promise<Service> => {
  return fetchJson<Service>(`/services/${serviceId}`, { 
    cache: 'no-store' 
  });
}
