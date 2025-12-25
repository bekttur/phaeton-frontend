import axios from 'axios';
export interface ContactDetails {
  fullName: string;
  email: string;
  phone: string;
  cityId?: number;
}

export interface NewUser {
  User1CGuid: string;
  Contragent1CGuid: string;
  Id?: number;
  Name: string;
  Email: string;
  CityId?: number;
}

export const fetchRegisterUser = async (
  data: ContactDetails
): Promise<NewUser> => {
  const response = await axios.post<NewUser>(
    'https://api.phaeton.kz/api/RetailRegister',
    {
      Fullname: data.fullName,
      Phone: `7${data.phone}`,
      Email: data.email,
      Password: '',
      ConfirmPassword: '',
      City: data.cityId || 1,
    }
  );

  return response.data;
};
