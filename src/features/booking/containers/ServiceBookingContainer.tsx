'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Spinner } from '@components';
import { useCompany } from '@features/company/hooks/useCompany';
import type { Service } from '@types';
import { BookingForm } from '@features/booking/components/BookingForm/index';

interface ServiceBookingContainerProps {
  service: Service;
}

export const ServiceBookingContainer = ({ service }: ServiceBookingContainerProps) => {
  const { company, loading: companyLoading } = useCompany();
  const router = useRouter();

  if (companyLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-6 px-4 py-10">
        <Spinner />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-10">
        <p className="text-center text-red-500">Company context unavailable.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-10">
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
      >
        ← Back to services
      </button>
      <div className="relative h-[320px] w-full overflow-hidden rounded-3xl">
        <Image src={service.image} alt={service.name} fill sizes="100vw" className="object-cover" />
      </div>
      <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <header className="flex flex-col gap-2 border-b border-slate-100 pb-4">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-400">{company.name}</p>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-semibold text-slate-900">{service.name}</h1>
            <div className="text-right">
              <p className="text-xs uppercase text-slate-400">Starting at</p>
              <p className="text-2xl font-bold" style={{ color: company.primaryColor }}>
                ${service.price}
              </p>
            </div>
          </div>
          <p className="text-sm text-slate-500">{service.description}</p>
        </header>

        <div className="mt-6">
          <BookingForm serviceId={service.id}  />
        </div>
      </section>
    </div>
  );
};
