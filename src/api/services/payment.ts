import axios from 'axios';

interface CreateOrderPayload {
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
  Name: string;
  Phone: string;
  Email: string;
}

export const fetchGettingContragent = async (): Promise<any> => {
  const response = await axios.get(
    `https://api.phaeton.kz/api/Dictionary?UserGuid=32c61d6f-9571-11e3-b018-0025909bbfce&ApiKey=TwIjwsvu5oitKSnQN9RS`
  );
  return response.data;
};


export const fetchCreateOrder = async (
  payload: CreateOrderPayload
): Promise<any> => {
  const response = await axios.post(
    'https://api.phaeton.kz/api/Order',
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