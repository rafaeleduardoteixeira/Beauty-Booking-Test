'use client';

import { Spinner } from '@components/atoms/Spinner';
import { useCompany } from '@features/company/hooks/useCompany';

export default function CompanyLandingPage() {
  const { company, loading, error, slug } = useCompany();

 if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Spinner className="text-blue-500" label={`Loading ${slug}...`} />
      </main>
    );
  }

  if (error || !company) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <p className="text-xl font-semibold text-red-500">{error ?? 'Company configuration unavailable.'}</p>
        <p className="text-gray-500 mt-2">Double-check the URL or try again later.</p>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
    >
      <div className="max-w-xl rounded-3xl p-10 shadow-xl" style={{ backgroundColor: '#fff' }}>
        <p className="uppercase tracking-wide text-sm font-semibold" style={{ color: company.secondaryColor }}>
          Welcome to
        </p>
        <h1 className="text-4xl font-bold mt-2 mb-4" style={{ color: company.primaryColor }}>
          {company.name}
        </h1>
        <p className="text-gray-600 mb-6">{company.description}</p>
        <div className="flex flex-col gap-2 text-gray-700">
          <span>{company.address}</span>
          <span>{company.phone}</span>
          <span>{company.email}</span>
        </div>
      </div>
    </main>
  );
}
