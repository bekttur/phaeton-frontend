import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchSearch, fetchSearchByArticle } from '../api/services/search';
import {
  fetchCreateOrder,
  fetchGettingContragent,
  fetchPaybox,
} from '../api/services/payment';
import { fetchRetailCity } from '../api/services/base';
import { fetchRegisterUser, type NewUser } from '../api/services/register';
import { fetchRetailPvz } from '../api/services/delivery';

export const useSearch = ({
  article,
  brand,
}: {
  article: string;
  brand: string;
}) => {
  return useQuery<any, Error>({
    queryKey: ['search', article, brand],
    queryFn: () => {
      console.log(`api/Search?Article=${article}&Brand=${brand}`);
      return fetchSearch({ article, brand });
    },
    enabled: Boolean(article && brand),

    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,

    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useSearchByArticle = ({ article }: { article: string }) => {
  return useQuery<any, Error>({
    queryKey: ['searchByArticle', article],
    queryFn: () => {
      console.log(`api/Search?Article=${article}`);
      return fetchSearchByArticle({ article });
    },
    enabled: Boolean(article),

    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,

    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useGettingContragent = () => {
  return useQuery<any, Error>({
    queryKey: ['gettingContragent'],
    queryFn: () => {
      console.log(`api/Dictionary`);
      return fetchGettingContragent();
    },
    enabled: true,
  });
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (data: any) => {
      console.log('api/RetailOrder');
      return fetchCreateOrder(data);
    },
  });
};

export const usePaybox = () => {
  return useMutation({
    mutationFn: (data: any) => {
      console.log('api/PayBoxRetail', data);
      return fetchPaybox(data);
    },
  });
};

export const useRetailCity = () => {
  return useQuery<any, Error>({
    queryKey: ['retailCity'],
    queryFn: () => {
      console.log(`api/RetailCity`);
      return fetchRetailCity();
    },
    enabled: true,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });
};

export const useRegisterUser = () => {
  return useMutation<NewUser, Error, any>({
    mutationFn: (data) => {
      console.log('api/RetailRegister', data);
      return fetchRegisterUser(data);
    },
  });
};

export const useRetailPvz = () => {
  return useQuery<any, Error>({
    queryKey: ['retailPvz'],
    queryFn: fetchRetailPvz,
    enabled: true,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });
};
