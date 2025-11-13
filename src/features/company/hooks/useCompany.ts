import { useCompanyContext } from '../context/CompanyProvider';

export function useCompany() {
  return useCompanyContext();
}
