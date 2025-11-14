export type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type BookingStatus = 'pending' | 'confirmed';

export interface Company {
  id: number;
  name: string;
  slug: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface Professional {
  id: number;
  companyId: number;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  bio: string;
  avatar: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: number;
  companyId: number;
  name: string;
  description: string;
  duration: number;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProfessionalService {
  id: number;
  professionalId: number;
  serviceId: number;
}

export interface ProfessionalAvailability {
  id: number;
  professionalId: number;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  bookedDates?: Record<string, string[]>;
}

export interface WorkingHours {
  id: number;
  companyId: number;
  dayOfWeek: DayOfWeek;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

export interface Booking {
  id: number;
  companyId: number;
  name: string;
  email: string;
  serviceId: number;
  professionalId: number;
  date: string;
  time: string;
  status: BookingStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Promotion {
  id: number;
  companyId: number;
  serviceId: number;
  title: string;
  description: string;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  badge?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BeautyBookingDatabase {
  companies: Company[];
  users: User[];
  professionals: Professional[];
  professionalServices: ProfessionalService[];
  professionalAvailability: ProfessionalAvailability[];
  services: Service[];
  bookings: Booking[];
  workingHours: WorkingHours[];
  promotions: Promotion[];
}
