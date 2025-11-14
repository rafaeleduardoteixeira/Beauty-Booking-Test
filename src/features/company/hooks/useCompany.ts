import { useCompanyContext } from '../context/CompanyProvider';

export const useCompany = () => {
  return useCompanyContext();
}
