import axios from 'axios';

interface CreateOrderPayload {
  Contact: {
    UserGuid: string;
    OrderType: number;
    Name: string;
    Phone: string;
    Email: string;
  };
  UserGuid: string;
  ContragentGuid: string;
  ApiKey: string;
  Brand: string;
  Article: string;
  WarehouseId: string;
  Price: number;
  Count: number;
  ExpectedDelivery: number;
  GuaranteedDelivery: number;
  Comment?: string;
  Force?: 0 | 1;
  Address: string;
  CoordinateX: string;
  CoordinateY: string;
  Courier: string;
  Code: string;
}

export const fetchGettingContragent = async (): Promise<any> => {
  const response = await axios.get(
    `https://api.phaeton.kz/api/Dictionary?UserGuid=9A6DAC71-DC40-11F0-BBDB-BC97E1B23A0B&ApiKey=ihUOF5RTrO5wAHhQfbQW`
  );
  return response.data;
};

export const fetchCreateOrder = async (
  payload: CreateOrderPayload
): Promise<any> => {
  const response = await axios.post(
    'https://api.phaeton.kz/api/RetailOrder',
    payload
  );

  return response.data;
};

export interface PayboxOrder {
  ProductCategoryGuid: string;
  WarehouseGuid: string;
  OrderGuid: string;
  OrderNumber: string;
  //   ErrorCode: string | null;
  //   Result: 'Ok' | 'Error';
}

interface PayboxPayload {
  Orders: PayboxOrder[];
  Amount: number;
  UserGuid: string;
  AgentGuid: string;
  ContractGuid: string;
  Description: string;
  Model: any;
}

export const fetchPaybox = async (payload: PayboxPayload) => {
  const response = await axios.post(
    'https://api.phaeton.kz/api/PayBoxRetail/CreatePaymentPaybox',
    payload
  );

  return response.data;
};
