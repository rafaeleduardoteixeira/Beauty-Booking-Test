import { ServicePageContainer } from '@features/service';

interface ServicePageProps {
  params: Promise<{ slug: string; serviceId: string }>;
}

 const ServicePage = async ({ params }: ServicePageProps) => {
  const { serviceId } = await params;
  
  return <ServicePageContainer serviceId={serviceId} />;
}

export default ServicePage;

