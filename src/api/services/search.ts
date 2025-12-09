import axios from 'axios';

export const fetchSearch = async ({
  article,
  brand,
}: {
  article: string;
  brand: string;
}): Promise<any> => {
  const response = await axios.get(
    `https://api.phaeton.kz/api/Search?Article=${article}&Brand=${brand}&Sources%5B%5D=1&includeAnalogs=true&UserGuid=32c61d6f-9571-11e3-b018-0025909bbfce&ApiKey=TwIjwsvu5oitKSnQN9RS`
  );
  return response.data;
};

export const fetchSearchByArticle = async ({
  article,
}: {
  article: string;
}): Promise<any> => {
  const response = await axios.get(
    `https://api.phaeton.kz/api/Search?Article=${article}&UserGuid=32c61d6f-9571-11e3-b018-0025909bbfce&ApiKey=TwIjwsvu5oitKSnQN9RS`
  );
  return response.data;
};
