import type { Professional, ProfessionalAvailability, ProfessionalService } from '@types';
import { fetchJson } from '@shared/config/api';

export async function fetchProfessionalsByService(serviceId: number, signal?: AbortSignal): Promise<Professional[]> {
  const professionalServices = await fetchJson<ProfessionalService[]>(
    `/professionalServices?serviceId=${serviceId}`,
    { signal },
  );

  const professionalIds = professionalServices.map((ps) => ps.professionalId);

  if (professionalIds.length === 0) {
    return [];
  }

  const query = professionalIds.map((id) => `id=${id}`).join('&');
  return fetchJson<Professional[]>(`/professionals?${query}`, { signal });
}

export const fetchProfessionalAvailability = (professionalId: number, signal?: AbortSignal) => {
  return fetchJson<ProfessionalAvailability[]>(
    `/professionalAvailability?professionalId=${professionalId}&isAvailable=true`,
    { signal },
  );
}
