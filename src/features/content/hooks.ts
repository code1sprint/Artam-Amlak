import { useQuery } from '@tanstack/react-query';
import { contentApi } from './api';

export function useTestimonials() {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: () => contentApi.getTestimonials(),
  });
}

export function useBlogPosts() {
  return useQuery({
    queryKey: ['blogPosts'],
    queryFn: () => contentApi.getBlogPosts(),
  });
}

export function useBlogPost(slug?: string) {
  return useQuery({
    queryKey: ['blogPost', slug],
    queryFn: () => (slug ? contentApi.getBlogPostBySlug(slug) : null),
    enabled: !!slug,
  });
}

export function useFAQs() {
  return useQuery({
    queryKey: ['faqs'],
    queryFn: () => contentApi.getFAQs(),
  });
}
