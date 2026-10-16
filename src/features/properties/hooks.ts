import { useQuery } from '@tanstack/react-query';
import { propertiesApi, GetPropertiesParams } from './api';
import { Property } from '@/types/schema';

export function useProperties(params: GetPropertiesParams = {}) {
  return useQuery({
    queryKey: ['properties', params],
    queryFn: () => propertiesApi.getProperties(params),
  });
}

export function useProperty(slug?: string) {
  return useQuery({
    queryKey: ['property', slug],
    queryFn: () => (slug ? propertiesApi.getPropertyBySlug(slug) : null),
    enabled: !!slug,
  });
}

export function useFeaturedProperties(limit = 6) {
  return useQuery({
    queryKey: ['properties', 'featured', limit],
    queryFn: () => propertiesApi.getFeatured(limit),
  });
}

export function useSimilarProperties(property?: Property | null, limit = 4) {
  return useQuery({
    queryKey: ['properties', 'similar', property?.id, limit],
    queryFn: () => (property ? propertiesApi.getSimilar(property, limit) : []),
    enabled: !!property,
  });
}

export function usePropertiesByIds(ids: string[]) {
  return useQuery({
    queryKey: ['properties', 'byIds', ids],
    queryFn: () => propertiesApi.getByIds(ids),
    enabled: ids.length > 0,
  });
}
