export interface PickupPoint {
  id: string;
  name: string;
  address: string;
  coords: [number, number];
  workTime?: string;
  lat?: string;
  lon?: string;
}

export const PICKUP_POINTS: PickupPoint[] = [
  {
    id: 'pickup-1',
    name: 'ПВЗ Mega',
    address: 'Алматы, ул. Абая, 11',
    coords: [43.238949, 76.889709],
    workTime: '10:00 - 21:00',
  },
  {
    id: 'pickup-2',
    name: 'ПВЗ Dostyk',
    address: 'Алматы, пр. Достык, 91',
    coords: [43.234321, 76.956123],
    workTime: '10:00 - 21:00',
  },
];
