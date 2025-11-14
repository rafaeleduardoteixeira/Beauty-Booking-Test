export interface BookingFormData {
  name: string;
  email: string;
  professionalId: string;
  date: string;
  time: string;
}

export interface BookingFormErrors {
  name: string;
  email: string;
  professionalId: string;
  date: string;
  time: string;
}

export interface BookingFormProps {
  serviceId: number;
  onSuccess?: () => void;
}
