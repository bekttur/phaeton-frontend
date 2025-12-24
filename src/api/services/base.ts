import axios from 'axios';

export const fetchRetailCity = async (): Promise<any> => {
  const response = await axios.get(
    `https://api.phaeton.kz/api/RetailCity?UserGuid=9A6DAC71-DC40-11F0-BBDB-BC97E1B23A0B&ApiKey=ihUOF5RTrO5wAHhQfbQW`
  );
  return response.data;
};