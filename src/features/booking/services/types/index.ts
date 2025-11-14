
export interface ICreateBookingData {
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