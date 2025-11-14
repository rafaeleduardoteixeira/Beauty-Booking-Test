'use client';

import { FormEvent } from 'react';
import { Button, Select, Input } from '@components';
import { useBookingForm } from './hooks/useBookingForm';
import { IBookingFormProps } from './types';
import { BookingCalendar } from '@features/booking/components/BookingCalendar';

export function BookingForm({ serviceId }: IBookingFormProps) {
  const {
    router,
    company,
    professionalOptions,
    professionalsLoading,
    professionalsError,
    availability,
    availabilityError,
    formValues,
    isBooking,
    handleSetValues,
    handleResetForm,
    handleValidate,
    onSubmit,
    handleDisableSubmit
  } = useBookingForm({ serviceId });



  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Your Name"
          value={formValues.values.name}
          error={formValues.error.name}
          onChange={(event) => handleSetValues('name', event.target.value)}
          onBlur={(event) => handleValidate('name', event.target.value)}
          placeholder="Jane Smith"
          required
        />
        <Input
          label="Email"
          type="email"
          value={formValues.values.email}
          error={formValues.error.email}
          onChange={(event) => handleSetValues('email', event.target.value)}
          onBlur={(event) => handleValidate('email', event.target.value)}
          placeholder="jane@email.com"
          required
        />
      </div>
      <Select
          label="Professional"
          value={formValues.values.professionalId}
          onChange={(event) => handleSetValues('professionalId', event.target.value)}
          options={professionalOptions}
          loading={professionalsLoading}
          placeholder="Select a professional..."
          required
        />
      {professionalsError ? <p className="text-sm text-red-500">{professionalsError}</p> : null}
      {!professionalsLoading && !professionalsError && professionalOptions.length === 0 ? (
        <p className="text-sm text-slate-500">No professionals available for this service.</p>
      ) : null}

      {formValues.values.professionalId ? (
        <BookingCalendar
          availability={availability}
          selectedDate={new Date(formValues.values.date)}
          onSelectDate={(date) => {
            handleSetValues('date', date);
            handleSetValues('time', '');
          }}
          selectedTime={formValues.values.time}
          onSelectTime={(time) => handleSetValues('time', time)}
        />
      ) : (
        <p className="text-sm text-slate-500">Select a professional to view availability.</p>
      )}
      {availabilityError ? <p className="text-sm text-red-500">{availabilityError}</p> : null}
      <div className="flex items-center justify-end gap-2">
        <Button
          type="button"
          accentColor={company?.secondaryColor}
          className="text-white"
          onClick={() => {
            handleResetForm();
            router.back();
          }}
        >
          Cancel
        </Button>
        
        <Button
          type="submit"
          accentColor={company?.primaryColor}
          className="text-white"
          disabled={handleDisableSubmit()}
        >
          {isBooking ? 'Booking...' : 'Book Now'}
        </Button>
      </div>
    </form>
  );
}
