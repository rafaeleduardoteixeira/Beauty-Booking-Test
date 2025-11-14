import { useEffect, useMemo, useState, useCallback, FormEvent } from 'react';
import { useServiceProfessionals, useProfessionalAvailability, createBooking } from '@features/booking';
import { useRouter } from 'next/navigation';
import { IUseBookingFormArgs } from './types';
import { useCompany } from '@features/company';
import { useToast } from '@shared/toast';
import { validateBookingForm } from '../../validateBookingForm';

type BookingFormValues = {
  name: string;
  email: string;
  professionalId: string;
  date: string;
  time: string;
};

type BookingFormErrors = Record<keyof BookingFormValues, string>;

const initialState = {
  values: {
    name: '',
    email: '',
    professionalId: '',
    date: '',
    time: '',
  } satisfies BookingFormValues,
  error: {
    name: '',
    email: '',
    professionalId: '',
    date: '',
    time: '',
  } satisfies BookingFormErrors,
};

export function useBookingForm({ serviceId }: IUseBookingFormArgs) {
  const router = useRouter()
  const { company } = useCompany()
  const { professionals, loading: professionalsLoading, error: professionalsError } = useServiceProfessionals(serviceId);
  const [isBooking, setIsBooking] = useState(false);

  const [formValues, setFormValues] = useState(initialState);

  useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      values: { ...prev.values, date: '', time: '' },
      error: { ...prev.error, date: '', time: '' },
    }));
  }, [formValues.values.professionalId]);

  const professionalOptions = useMemo(
    () =>
      professionals.map((professional) => ({
        value: professional.id,
        label: professional.name,
      })),
    [professionals],
  );

  const { availability, error: availabilityError } = useProfessionalAvailability(
    formValues.values.professionalId ? Number(formValues.values.professionalId) : undefined,
  );

  const { success, error: toastError } = useToast();

  const handleBooking = useCallback(async () => {
    if (!formValues.values.professionalId || !formValues.values.date || !formValues.values.time) return;

    setIsBooking(true);

    try {
      const formattedDate = (formValues.values.date as unknown as Date).toISOString().split('T')[0];
      await createBooking({
        ...formValues.values,
        companyId: company?.id || 0,
        serviceId,
        status: 'pending',
        professionalId: Number(formValues.values.professionalId),
        date: formattedDate,
        time: formValues.values.time,
      });
      success('Booking requested! We will confirm shortly.');
      router.push(`/${company?.slug}`);
    } catch (error) {
      toastError('Failed to create booking.');
    } finally {
      setIsBooking(false);
    }
  }, [company?.id, serviceId, formValues.values, success, toastError]);

  const handleSetValues = useCallback(
    (field: keyof BookingFormValues, value: string | Date | undefined) => {
      setFormValues((prev) => {
        let nextValues = { ...prev.values, [field]: value } as BookingFormValues;
        let nextErrors = { ...prev.error, [field]: '' } as BookingFormErrors;

        if (field === 'professionalId') {
          nextValues = { ...nextValues, date: '', time: '' };
          nextErrors = { ...nextErrors, date: '', time: '' };
        }

        return {
          values: nextValues,
          error: nextErrors,
        };
      });
    },
    [],
  );

  const handleResetForm = useCallback(() => {
    setFormValues(initialState);
  }, []);


  const handleValidate = (field: string, value: string) => {
    const errors = validateBookingForm(field, {
      name: field === 'name' ? value : formValues.values.name,
      email: field === 'email' ? value : formValues.values.email,
      professionalId: formValues.values.professionalId,
      date: formValues.values.date,
      time: formValues.values.time,
    });
    setFormValues((prevFormValues) => {
      return {
        ...prevFormValues,
        error: {
          ...errors,
        },
      }
    });
  }

  const handleDisableSubmit = () => {
    return !formValues.values.professionalId || !formValues.values.date || !formValues.values.time || !formValues.values.name || !formValues.values.email || isBooking;
  }

  
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleBooking();
  };


  return {
    router,
    company,
    professionalOptions,
    professionalsLoading,
    professionalsError,
    availability,
    availabilityError,
    isBooking,
    formValues,
    handleSetValues,
    handleResetForm,
    handleValidate,
    onSubmit,
    handleDisableSubmit
  };
}
