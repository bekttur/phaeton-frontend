import { useState } from 'react';
import { GarageHeader } from './elements/GarageHeader';
import { InfoCards } from './elements/InfoCards';
import { ServiceCards } from './elements/ServiceCards';
import { CarCard } from './elements/CarCard';
import { TabBar } from './elements/TabBar';
import { StatusTab } from './elements/StatusTab';
import { ServicesTab } from './elements/ServicesTab';

export function Garage() {
  const [activeTab, setActiveTab] = useState<'status' | 'services'>('status');

  return (
    <div className='block lg:hidden min-h-screen'>
      <div className='bg-[radial-gradient(circle,#2B4744,#28363B)] relative'>
        <GarageHeader />

        {activeTab === 'status' && <InfoCards />}
        {activeTab === 'services' && <ServiceCards />}

        <CarCard activeTab={activeTab} />
      </div>

      <div className='bg-[#F7F7F7]'>
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'status' && <StatusTab />}
        {activeTab === 'services' && <ServicesTab />}
      </div>
    </div>
  );
}
