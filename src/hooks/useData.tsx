import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchSearch, fetchSearchByArticle } from '../api/services/search';
import {
  fetchCreateOrder,
  fetchGettingContragent,
  fetchPaybox,
} from '../api/services/payment';

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