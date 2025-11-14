import { useMemo } from 'react';
import type { ProfessionalAvailability } from '@types';

const SLOT_INTERVAL_MINUTES = 30;

function generateTimeSlots(start: string, end: string) {
  const [startHour, startMinute] = start.split(':').map(Number);
  const [endHour, endMinute] = end.split(':').map(Number);
  const slots: string[] = [];
  const startDate = new Date();
  startDate.setHours(startHour, startMinute, 0, 0);
  const endDate = new Date();
  endDate.setHours(endHour, endMinute, 0, 0);

  for (let time = startDate.getTime(); time < endDate.getTime(); time += SLOT_INTERVAL_MINUTES * 60 * 1000) {
    const date = new Date(time);
    const hrs = String(date.getHours()).padStart(2, '0');
    const mins = String(date.getMinutes()).padStart(2, '0');
    slots.push(`${hrs}:${mins}`);
  }

  return slots;
}

export function useBookingCalendar(availability: ProfessionalAvailability[], selectedDate?: Date) {
  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const availableDateSet = useMemo(() => {
    const dates = new Set<string>();
    for (let offset = 0; offset < 60; offset += 1) {
      const date = new Date(today);
      date.setDate(date.getDate() + offset);
      const dayOfWeek = date
        .toLocaleDateString('en-US', { weekday: 'long' })
        .toLowerCase() as ProfessionalAvailability['dayOfWeek'];

      const hasOpenSlot = availability.some((slot) => {
        if (!slot.isAvailable || slot.dayOfWeek !== dayOfWeek) {
          return false;
        }
        const dateKey = date.toISOString().split('T')[0];
        const allSlots = generateTimeSlots(slot.startTime, slot.endTime);
        const booked = new Set(slot.bookedDates?.[dateKey] ?? []);
        return allSlots.some((time) => !booked.has(time));
      });

      if (hasOpenSlot) {
        dates.add(date.toDateString());
      }
    }
    return dates;
  }, [availability, today]);

  const timeSlots = useMemo(() => {
    if (!selectedDate) {
      return [];
    }
    const day = selectedDate
      .toLocaleDateString('en-US', { weekday: 'long' })
      .toLowerCase() as ProfessionalAvailability['dayOfWeek'];
    const matchingSlots = availability.filter((slot) => slot.dayOfWeek === day && slot.isAvailable);
    if (matchingSlots.length === 0) {
      return [];
    }

    const dateKey = selectedDate.toISOString().split('T')[0];
    const bookedTimes = new Set<string>(
      matchingSlots.flatMap((slot) => slot.bookedDates?.[dateKey] ?? []),
    );

    return matchingSlots
      .flatMap((slot) => generateTimeSlots(slot.startTime, slot.endTime))
      .filter((time) => !bookedTimes.has(time));
  }, [availability, selectedDate]);

  const isDateAvailable = (date: Date) => availableDateSet.has(date.toDateString());

  return {
    today,
    availableDateSet,
    isDateAvailable,
    timeSlots,
  };
}
