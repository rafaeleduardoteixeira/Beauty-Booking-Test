import { useCompanyContext } from '@features/company/context/CompanyProvider';

export const useCompany = () => {
  return useCompanyContext();
}
