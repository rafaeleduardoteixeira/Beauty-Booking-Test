'use client';

import { Spinner, ServiceCard } from '@components';
import { useCompany } from '@features/company/hooks/useCompany';
import { useCardList } from '../hooks/useCardList';
import { useRouter, useSearchParams } from 'next/navigation';

export const CardListContainer = () => {
  const { company, slug } = useCompany();
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams?.get('q') ?? '';
  const { cards, loading, error } = useCardList(company?.id, query);

  if (!company) {
    return null;
  }

  const accentColor = company.primaryColor;

  return (
    <section className="w-full px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Services</p>
            <h2 className="text-2xl font-semibold text-slate-900">Handpicked for you</h2>
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <Spinner color={accentColor} />
          </div>
        ) : error ? (
          <p className="rounded-2xl bg-rose-50 p-4 text-center text-rose-600">{error}</p>
        ) : cards.length ? (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {cards.map(({ service, promotion }) => (
              <ServiceCard
                key={service.id}
                title={service.name}
                description={service.description}
                rating={service.rating}
                reviewCount={service.reviewCount}
                price={service.price}
                duration={service.duration}
                image={service.image}
                badgeLabel={promotion?.badge ?? promotion?.title}
                accentColor={accentColor}
                onBook={() => router.push(`/${slug}/service/${service.id}`)}
              />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-slate-200 p-4 text-center text-sm text-slate-500">
            No services available for this company yet.
          </p>
        )}
      </div>
    </section>
  );
}
