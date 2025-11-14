import type { Professional, ProfessionalAvailability, ProfessionalService } from '@types';
import { API_BASE_URL, fetchJson } from '@shared/config/api';

export const fetchProfessionalsByService = async (serviceId: number, signal?: AbortSignal): Promise<Professional[]> => {
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

export interface CreateBookingData {
  companyId: number;
  name: string;
  email: string;
  serviceId: number;
  professionalId: number;
  date: string;
  time: string;
  status?: 'pending' | 'confirmed';
  notes?: string;
}

export const createBooking = async (data: CreateBookingData): Promise<{ id: number }> => {
  const bookingData = {
    ...data,
    status: data.status ?? 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    throw new Error('Failed to create booking');
  }

  return response.json();
}
