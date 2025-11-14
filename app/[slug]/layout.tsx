import type { ReactNode } from 'react';
import { CompanyProvider } from '@features/company/context/CompanyProvider';

interface CompanyLayoutProps {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function CompanyLayout({ children, params }: CompanyLayoutProps) {
  const { slug } = await params;
  return <CompanyProvider slug={slug}>{children}</CompanyProvider>;
}
