import { AIAssistant } from './AIAssistant';
import { CarEvaluation } from './CarEvaluation';
import { ServiceHistory } from './ServiceHistory';

export function StatusTab() {
  return (
    <div className='pb-6'>
      <AIAssistant />
      <ServiceHistory />
      <CarEvaluation />
    </div>
  );
}
