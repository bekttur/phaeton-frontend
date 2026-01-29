import { Insurance } from './Insurance';
import { Operations } from './Operations';
import { Promotions } from './Promotions';
import { ServiceBanner } from './ServiceBanner';

export function ServicesTab() {
  return (
    <div className='pb-6'>
      <Operations />
      <ServiceBanner />
      <Insurance />
      <Promotions />
    </div>
  );
}
