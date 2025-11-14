import { ProfessionalAvailability } from "@types";

export interface IBookingCalendarProps {
  availability: ProfessionalAvailability[];
  selectedDate?: Date;
  onSelectDate: (value: Date | undefined) => void;
  selectedTime: string;
  onSelectTime: (value: string) => void;
}   