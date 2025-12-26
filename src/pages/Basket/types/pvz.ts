export type PvzApiItem = {
  id: string;
  nameStore: string;
  locLatitude: string;
  locLongitude: string;
  addStreetRu: string;
  regionRu: string;
  locTime: string;
};

export type PvzApiResponse = {
  Success: boolean;
  Count: number;
  PvzList: PvzApiItem[];
};
