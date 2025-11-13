import type { Company } from '@types';

const DEFAULT_API_BASE_URL = 'http://localhost:3001';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL;

export async function fetchCompanyConfig(slug: string): Promise<Company | null> {
  if (!slug) {
    return null;
  }

  const query = new URLSearchParams({ slug });
  const response = await fetch(`${apiBaseUrl}/companies?${query.toString()}`, {
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch company config for slug "${slug}"`);
  }

  const data: Company[] = await response.json();
  return data[0] ?? null;
}
