'use client';

import type { ReactNode } from 'react';
import { useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { Header, Spinner } from '@components';
import { useCompany } from '@features/company/hooks/useCompany';

interface CompanyLayoutContainerProps {
  children: ReactNode;
}

export const CompanyLayoutContainer = ({ children }: CompanyLayoutContainerProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { company, loading } = useCompany();

  const handleSearch = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      const trimmed = query.trim();
      if (trimmed) {
        params.set('q', trimmed);
      } else {
        params.delete('q');
      }
      const search = params.toString();
      router.push(`/${company?.slug}?${search}`);
    },
    [company?.slug, router, searchParams],
  );

  useEffect(() => {
    if (!loading && !company) {
      notFound();
    }
  }, [loading, company]);

  if (loading){
    return <div className="flex justify-center items-center h-screen"><Spinner/></div>;
  }

  return (
    <>
      <Header handleSearch={handleSearch} />
      {children}
    </>
  );
}
