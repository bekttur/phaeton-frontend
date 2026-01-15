import { useMutation, useQuery } from '@tanstack/react-query';
import {
  fetchArticleDetails,
  fetchArticlesTree,
  fetchBrands,
  fetchKTypes,
  fetchSeries,
  fetchShowVehicleByKType,
  fetchTreeVehicleByKType,
} from '../api/services/model';
import { useAuth } from '../context/AuthContext';

interface Params {
  ktype: number;
  nodeId: number;
  page?: number;
  perPage?: number;
}

interface Params2 {
  articleId?: number;
  ktype?: number;
  number?: string;
  mfrId?: number;
}


export const useBrands = (enabled: boolean) => {
  return useQuery({
    queryKey: ['brands'],
    queryFn: fetchBrands,
    enabled,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });
};

export const useSeries = (mfrId: number | null, enabled: boolean) => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: ['series', mfrId],
    enabled: enabled && !!mfrId && !!accessToken,
    queryFn: () => fetchSeries(mfrId!, accessToken!),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });
};

export const useKTypes = (
  mfrId: number | null,
  seriesId: number | null,
  enabled: boolean
) => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: ['ktypes', mfrId, seriesId],
    enabled: enabled && !!mfrId && !!seriesId,
    queryFn: () => fetchKTypes(mfrId!, seriesId!, accessToken!),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });
};

export const useShowVehicleByKType = () => {
  const { accessToken } = useAuth();

  return useMutation({
    mutationFn: (ktype: number) => fetchShowVehicleByKType(ktype, accessToken!),
  });
};

export const useTreeVehicleByKType = (ktype?: number) => {
  return useQuery({
    queryKey: ['tree-vehicle', ktype],
    enabled: !!ktype,
    queryFn: () => fetchTreeVehicleByKType(ktype!),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });
};

export const useArticlesTree = ({
  ktype,
  nodeId,
  page = 1,
  perPage = 24,
}: Params) => {
  return useQuery({
    queryKey: ['articles-tree', ktype, nodeId, page],
    queryFn: () => fetchArticlesTree(ktype, nodeId, page, perPage),
    enabled: !!ktype && !!nodeId,
    //@ts-ignore
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });
};


export const useArticleDetails = ({
  articleId,
  ktype,
  number,
  mfrId,
}: Params2) => {
  return useQuery({
    queryKey: ['article-details', articleId, ktype, number, mfrId],
    queryFn: () =>
      fetchArticleDetails({
        articleId: articleId!,
        ktype: ktype!,
        number: number!,
        mfrId: mfrId!,
      }),
    enabled: !!articleId && !!ktype && !!number && !!mfrId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  });
};