import axios from 'axios';

export const fetchRetailPvz = async () => {
  const response = await axios.get(
    'https://api.phaeton.kz/api/RetailPvz'
  );

  return response.data;
};