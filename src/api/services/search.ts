import axios from 'axios';

export const fetchSearch = async ({
  article,
  brand,
}: {
  article: string;
  brand: string;
}): Promise<any> => {
  const response = await axios.get(
    `https://api.phaeton.kz/api/Search?Article=${article}&Brand=${brand}&Sources%5B%5D=1&includeAnalogs=true&UserGuid=9A6DAC71-DC40-11F0-BBDB-BC97E1B23A0B&ApiKey=ihUOF5RTrO5wAHhQfbQW`
  );
  return response.data;
};

export const fetchSearchByArticle = async ({
  article,
}: {
  article: string;
}): Promise<any> => {
  const response = await axios.get(
    `https://api.phaeton.kz/api/Search?Article=${article}&UserGuid=9A6DAC71-DC40-11F0-BBDB-BC97E1B23A0B&ApiKey=ihUOF5RTrO5wAHhQfbQW`
  );
  return response.data;
};
