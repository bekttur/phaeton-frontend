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
