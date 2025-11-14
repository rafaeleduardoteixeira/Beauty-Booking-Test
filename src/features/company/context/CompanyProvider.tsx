'use client';

import { createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Company } from '@types';
import { fetchCompanyConfig } from '../services/company.service';

interface CompanyContextValue {
  slug: string;
  company: Company | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const CompanyContext = createContext<CompanyContextValue | undefined>(undefined);

interface CompanyProviderProps {
  slug: string;
  children: ReactNode;
}

export const CompanyProvider = ({ slug, children }: CompanyProviderProps) => {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCompany = useCallback(async () => {
    if (!slug) {
      setCompany(null);
      setError('Missing company slug');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await fetchCompanyConfig(slug);
      if (!result) {
        setError('Company not found');
      }
      setCompany(result);
    } catch (err) {
      console.error(err);
      setError('Unable to load company configuration');
      setCompany(null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    loadCompany();
  }, [loadCompany]);

  const value = useMemo(
    () => ({
      slug,
      company,
      loading,
      error,
      refresh: loadCompany,
    }),
    [slug, company, loading, error, loadCompany],
  );

  return <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>;
}

export const useCompanyContext = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompanyContext must be used within a CompanyProvider');
  }
  return context;
}
