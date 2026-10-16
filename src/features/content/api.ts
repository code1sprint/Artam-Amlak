import { MOCK_TESTIMONIALS } from '@/data/testimonials.mock';
import { MOCK_BLOG_POSTS } from '@/data/blog.mock';
import { MOCK_FAQS } from '@/data/faq.mock';
import { Testimonial, BlogPost, FAQItem } from '@/types/schema';

const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

export const contentApi = {
  getTestimonials: async (): Promise<Testimonial[]> => {
    await delay();
    return MOCK_TESTIMONIALS;
  },

  getBlogPosts: async (): Promise<BlogPost[]> => {
    await delay();
    return MOCK_BLOG_POSTS;
  },

  getBlogPostBySlug: async (slug: string): Promise<BlogPost | null> => {
    await delay();
    return MOCK_BLOG_POSTS.find((p) => p.slug === slug) ?? null;
  },

  getFAQs: async (): Promise<FAQItem[]> => {
    await delay();
    return MOCK_FAQS;
  },
};
