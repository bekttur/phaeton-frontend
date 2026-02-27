import axios from 'axios';
import { getOrCreateSessionId } from '../../shared/lib/session';
import apiBackendFra from './api';

export interface ContactDetails {
  fullName: string;
  email: string;
  phone: string;
  cityId?: number;
  userGuid: string;
  contragentGuid: string;
}

export interface NewUser {
  id: number;
  email: string;
  name: string;
  phone: number;
  createDate: string;
  isDeleted: boolean;
  isLocked: boolean;
  asDefaultUser: boolean;

  user1CGuid: string;
  contragent1CGuid: string;

  cityId: number;

  freedomUserId: number;
}

export interface IUser {
  id: number;
  email: string;
  name: string;
  phone: string;
  createDate: string;
  isDeleted: boolean;
  isLocked: boolean;
  asDefaultUser: boolean;
  user1CGuid: string;
  contragent1CGuid: string;
  cityId: number;
  shoppingCartItemsCount: number;
  orderCount: number;
  favoriteCount: number;
}

export const fetchRegisterUser = async (
  data: ContactDetails,
): Promise<NewUser> => {
  const response = await axios.post<NewUser>(
    // 'https://api.phaeton.kz/api/RetailRegister',
    // {
    //   Fullname: data.fullName,
    //   Phone: `7${data.phone}`,
    //   Email: data.email,
    //   Password: '',
    //   ConfirmPassword: '',
    //   City: data.cityId || 1,
    // }
    'https://backendfra.phaeton.kz/users/register',
    {
      email: data.email,
      name: data.fullName,
      password: '12345678',
      phone: Number(`${data.phone}`),
      cityId: data.cityId || 1,
      user1CGuid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      contragent1CGuid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    },
  );

  return response.data;
};

export const fetchLoginUser = async (data: ContactDetails): Promise<string> => {
  const sessionID = getOrCreateSessionId();

  const response = await axios.post<string>(
    'https://backendfra.phaeton.kz/users/login',
    {
      password: '12345678',
      phone: `${data.phone}`,
      sessionId: sessionID,
    },
  );

  return response.data;
};

export const fetchUserMe = async (): Promise<IUser> => {
  const response = await apiBackendFra.get<IUser>('/users');
  return response.data;
};
