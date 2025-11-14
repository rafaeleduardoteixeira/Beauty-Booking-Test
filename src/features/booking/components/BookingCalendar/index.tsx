'use client';

import { useMemo } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useBookingCalendar } from './hooks/useBookingCalendar';
import { IBookingCalendarProps } from './types';

const dayPickerClassNames = {
  root: 'rdp text-slate-400 min-w-[300px] flex align-center justify-center py-2',
  day: 'h-12 w-12 lg:h-10 lg:w-10 rounded-full text-sm font-medium hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-400',
  day_button: 'w-full h-full rounded-full',
  selected: 'bg-slate-200 text-white hover:bg-slate-200',
  outside: 'text-slate-300',
  disabled: 'text-slate-300 opacity-50',
};

export const BookingCalendar = ({
  availability,
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
}: IBookingCalendarProps) => {
  const { today, availableDateSet, isDateAvailable, timeSlots } = useBookingCalendar(availability, selectedDate);
  const availableDates = useMemo(
    () => Array.from(availableDateSet).map((value) => new Date(value)),
    [availableDateSet],
  );

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={(date) => {
          if (date && isDateAvailable(date)) {
            onSelectDate(date);
          } else {
            onSelectDate(undefined);
          }
        }}
        disabled={[
          { before: today },
          (date) => !isDateAvailable(date),
        ]}
        fromDate={today}
        toDate={new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000)}
        classNames={dayPickerClassNames}
        modifiers={{ available: availableDates }}
        modifiersClassNames={{ available: 'font-semibold text-slate-900' }}
      />
      <div className={`flex ${!selectedDate ? 'items-center justify-center' : 'flex-wrap items-start justify-start h-fit'} gap-2 border-t border-slate-100 pt-2 sm:border-t-0`}>
        {timeSlots.length === 0 ? (
          <p className="text-center text-sm text-slate-500">Select a date to see available times.</p>
        ) : (
          timeSlots.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => onSelectTime(slot)}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                selectedTime === slot
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
              }`}
            >
              {slot}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
