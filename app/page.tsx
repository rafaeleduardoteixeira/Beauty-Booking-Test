'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Service = {
  id: number;
  name: string;
  duration: number;
  price: number;
};

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:3001/services');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError('Error loading services. Please try again later.');
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">{error}</p>
          <p className="mt-2">Make sure the JSON server is running (npm run server)</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Beauty Booking</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
              <p className="text-gray-600 mb-2">Duration: {service.duration} minutes</p>
              <p className="text-lg font-semibold text-blue-600 mb-4">${service.price}</p>
              <Link 
                href={`/book?serviceId=${service.id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors block text-center"
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
