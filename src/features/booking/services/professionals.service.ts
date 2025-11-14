import type {
  Professional,
  ProfessionalAvailability,
  ProfessionalService,
  Booking,
  Service,
  DayOfWeek,
} from '@types';
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


const minutesFromTime = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const timeFromMinutes = (minutes: number) => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
};

export const fetchProfessionalAvailability = async (professionalId: number, signal?: AbortSignal) => {
  //This logic is to emulate a backend service to filter availability
  const availability = await fetchJson<ProfessionalAvailability[]>(
    `/professionalAvailability?professionalId=${professionalId}&isAvailable=true`,
    { signal },
  );

  const allBookings = await fetchJson<Booking[]>(
    `/bookings?professionalId=${professionalId}`,
    { signal },
  );

  if (allBookings.length === 0) {
    return availability;
  }

  const bookingsWithDuration = await Promise.all(
    allBookings.map(async (booking) => {
      const service = await fetchServiceById(booking.serviceId, signal);
      return {
        ...booking,
        duration: service.duration,
      };
    }),
  );

  const bookingsByDate: Record<string, Array<{ time: string; duration: number }>> = {};
  for (const booking of bookingsWithDuration) {
    if (!bookingsByDate[booking.date]) {
      bookingsByDate[booking.date] = [];
    }
    bookingsByDate[booking.date].push({
      time: booking.time,
      duration: booking.duration,
    });
  }

  const SLOT_INTERVAL_MINUTES = 30;
  const availabilityWithBlockedSlots = availability.map((avail) => {
    const bookedDates: Record<string, string[]> = {};
    for (const [date, bookings] of Object.entries(bookingsByDate)) {
      const blockedSlots = new Set<string>();

      for (const booking of bookings) {
        const bookingStartMinutes = minutesFromTime(booking.time);
        const bookingEndMinutes = bookingStartMinutes + booking.duration;
        for (let minutes = bookingStartMinutes; minutes < bookingEndMinutes; minutes += SLOT_INTERVAL_MINUTES) {
          blockedSlots.add(timeFromMinutes(minutes));
        }
      }

      if (blockedSlots.size > 0) {
        bookedDates[date] = Array.from(blockedSlots);
      }
    }

    return {
      ...avail,
      bookedDates,
    };
  });

  return availabilityWithBlockedSlots;
};

export const fetchServiceById = async (serviceId: number, signal?: AbortSignal) => {
  return fetchJson<Service>(`/services/${serviceId}`, { signal });
};

interface AvailableTimeSlotsParams {
  professionalId: number;
  date: string;
  slotIntervalMinutes?: number;
  signal?: AbortSignal;
}

