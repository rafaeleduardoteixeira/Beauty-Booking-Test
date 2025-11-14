import type { ButtonHTMLAttributes } from 'react';

export interface IServiceCardProps {
  title: string;
  description: string;
  rating: number;
  reviewCount: number;
  price: number;
  duration: number;
  image: string;
  badgeLabel?: string;
  accentColor: string;
  onBook?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
}
