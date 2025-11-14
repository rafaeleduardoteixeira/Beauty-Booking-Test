import { CompanyProvider } from '@features/company/context/CompanyProvider';
import { CompanyLayoutContainer } from '@features/company/containers';
import { ILayoutProps } from './types';

const Layout = async ({ children, params }: ILayoutProps) => {
  const { slug } = await params;
  
  return (
    <CompanyProvider slug={slug}>
      <CompanyLayoutContainer>{children}</CompanyLayoutContainer>
    </CompanyProvider>
  );
}

export default Layout;
