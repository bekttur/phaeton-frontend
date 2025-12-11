import { useQuery } from '@tanstack/react-query';
import { fetchSearch, fetchSearchByArticle } from '../api/services/search';

export const useSearch = ({
  article,
  brand,
}: {
  article: string;
  brand: string;
}) => {
  return useQuery<any, Error>({
    queryKey: [`search`],
    queryFn: () => fetchSearch({ article: article, brand: brand }),
    enabled: true,
  });
};

export const useSearchByArticle = ({ article }: { article: string }) => {
  return useQuery<any, Error>({
    queryKey: ['searchByArticle', article],
    queryFn: () => fetchSearchByArticle({ article }),
    enabled: true,
  });
};
