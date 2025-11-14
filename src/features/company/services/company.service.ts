import type { Company } from '@types';
import { fetchJson } from '@shared/config/api';

export const fetchCompanyConfig = async (slug: string): Promise<Company | null> => {
  if (!slug) {
    return null;
  }

  const query = new URLSearchParams({ slug });
  const data = await fetchJson<Company[]>(`/companies?${query.toString()}`);
  return data[0] ?? null;
}
