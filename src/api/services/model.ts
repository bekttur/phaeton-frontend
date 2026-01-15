import { api } from './api';

interface FetchArticleDetailsParams {
  articleId: number;
  ktype: number;
  number: string;
  mfrId: number;
}

export const fetchBrands = async () => {
  const { data } = await api.get('/TecDoc/Makes');
  return data;
};

export const fetchSeries = async (mfrId: number, accessToken: string) => {
  const { data } = await api.get('/TecDoc/Series', {
    params: { mfrId },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};

export const fetchKTypes = async (
  mfrId: number,
  seriesId: number,
  accessToken: string
) => {
  const { data } = await api.get('/TecDoc/KTypes', {
    params: { mfrId, seriesId },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export const fetchShowVehicleByKType = async (
  ktype: number,
  accessToken: string
) => {
  const { data } = await api.get('/TecDoc/ShowVehicleByKType', {
    params: {
      ktype,
      ktypeType: 'P',
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};

export const fetchTreeVehicleByKType = async (ktype: number) => {
  const { data } = await api.get('/TecDoc/TreeVehicleByKType', {
    params: {
      ktype,
      country: 'UA',
      lang: 'ru',
    },
  });
  return data;
};

export const fetchArticlesTree = async (ktype: number, nodeId: number, page: number, perPage: number) => {
  const { data } = await api.get(
    '/TecDoc/ArticlesTree',
    {
      params: {
        ktype,
        nodeId,
        page,
        perPage,
        country: 'UA',
        lang: 'ru',
      },
    }
  );

  return data;
};

export const fetchArticleDetails = async ({
  articleId,
  ktype,
  number,
  mfrId,
}: FetchArticleDetailsParams) => {
  const { data } = await api.get('/TecDoc/DetailsArticles', {
    params: {
      articleId,
      ktype,
      number,
      mfrId,
      country: 'UA',
      lang: 'ru',
    },
  });

  return data;
};