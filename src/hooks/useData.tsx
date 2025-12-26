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
    queryFn: () => fetchSearch({ article: article, brand: brand }),
    enabled: Boolean(article && brand),
  });
};

export const useSearchByArticle = ({ article }: { article: string }) => {
  return useQuery<any, Error>({
    queryKey: ['searchByArticle'],
    queryFn: () => fetchSearchByArticle({ article }),
    enabled: Boolean(article),
  });
};

export const useGettingContragent = () => {
  return useQuery<any, Error>({
    queryKey: ['gettingContragent'],
    queryFn: () => fetchGettingContragent(),
    enabled: true,
  });
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: fetchCreateOrder,
  });
};

export const usePaybox = () => {
  return useMutation({
    mutationFn: fetchPaybox,
  });
};

export const useRetailCity = () => {
  return useQuery<any, Error>({
    queryKey: ['retailCity'],
    queryFn: () => fetchRetailCity(),
    enabled: true,
  });
};
export const useRegisterUser = () => {
  return useMutation<NewUser, Error, any>({
    mutationFn: (data) => fetchRegisterUser(data),
  });
};

export const useRetailPvz = () => {
  return useQuery<any, Error>({
    queryKey: ['retailPvz'],
    queryFn: fetchRetailPvz,
    enabled: true,
    staleTime: 1000 * 60 * 5,
  });
};