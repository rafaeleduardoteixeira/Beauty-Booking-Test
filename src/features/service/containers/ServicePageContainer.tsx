'use client';

import { Spinner } from '@components';
import { ServiceBookingContainer } from '@features/booking';
import { useServicePage } from '@features/service/hooks/useServicePage';
import { IServicePageContainerProps } from '@features/service/containers/types';



export const ServicePageContainer = ({ serviceId }: IServicePageContainerProps) => {
  const { service, loading, error } = useServicePage(serviceId);

  if (loading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-6 px-4 py-10">
        <Spinner />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-10">
        <p className="text-center text-red-500">
          {error || 'Service not found'}
        </p>
      </div>
    );
  }

  return <ServiceBookingContainer service={service} />;
}
