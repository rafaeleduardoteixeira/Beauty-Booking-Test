import type { BookingFormData, BookingFormErrors } from '../types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateBookingForm = (field: string, data: BookingFormData): BookingFormErrors => {
  const errors: BookingFormErrors = {
    name: '',
    email: '',
    professionalId: '',
    date: '',
    time: '',
  };

  if (field === 'name' && !data.name.trim()) {
    errors.name = 'Name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (field === 'email' && !data.email.trim()) {
    errors.email = 'Email is required';
  } else if (field === 'email' && !EMAIL_REGEX.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (field === 'professionalId' && !data.professionalId) {
    errors.professionalId = 'Please select a professional';
  }

  if (field === 'date' && !data.date) {
    errors.date = 'Please select a date';
  } else {
    const selectedDate = new Date(data.date || '');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      errors.date = 'Date must be in the future';
    }
  }

  if (field === 'time' && !data.time) {
    errors.time = 'Please select a time';
  } else if (field === 'time' && data.date) {
    const selectedDate = new Date(data.date);
    const today = new Date();
    
    if (field === 'time' && selectedDate.toDateString() === today.toDateString()) {
      const [hours, minutes] = data.time.split(':').map(Number);
      const selectedDateTime = new Date(selectedDate);
      selectedDateTime.setHours(hours, minutes, 0, 0);
      
      if (selectedDateTime <= new Date()) {
        errors.time = 'Time must be in the future';
      }
    }
  }

  return errors;
}
