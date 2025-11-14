import { ServicePageContainer } from '@features/service';
import { IServicePageProps } from './types';


 const ServicePage = async ({ params }: IServicePageProps) => {
  const { serviceId } = await params;
  
  return <ServicePageContainer serviceId={serviceId} />;
}

export default ServicePage;

