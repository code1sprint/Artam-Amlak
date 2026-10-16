import { z } from 'zod';

/** Absolute URL or site-root path (e.g. /images/hero/home-hero.jpg) */
export const mediaSrcSchema = z
  .string()
  .min(1)
  .refine(
    (value) => value.startsWith('/') || /^https?:\/\//i.test(value),
    { message: 'Must be a root-relative path or absolute URL' },
  );

// Deal & Property Types
export const dealTypeSchema = z.enum(['sale', 'rent', 'mortgage']);
export type DealType = z.infer<typeof dealTypeSchema>;

export const propertyTypeSchema = z.enum(['apartment', 'villa', 'land', 'commercial']);
export type PropertyType = z.infer<typeof propertyTypeSchema>;

// Property Schema
export const propertySchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string().min(5),
  description: z.string(),
  dealType: dealTypeSchema,
  propertyType: propertyTypeSchema,
  price: z.number().nonnegative(),
  deposit: z.number().nonnegative().optional(),
  rent: z.number().nonnegative().optional(),
  area: z.number().positive(),
  bedrooms: z.number().int().nonnegative(),
  bathrooms: z.number().int().nonnegative(),
  parking: z.number().int().nonnegative(),
  floor: z.number().int().optional(),
  totalFloors: z.number().int().optional(),
  buildYear: z.number().int().optional(),
  city: z.string(),
  district: z.string(),
  address: z.string(),
  lat: z.number(),
  lng: z.number(),
  images: z.array(mediaSrcSchema).min(1),
  features: z.array(z.string()),
  isFeatured: z.boolean().default(false),
  isNew: z.boolean().default(false),
  agentId: z.string(),
  createdAt: z.string(),
});
export type Property = z.infer<typeof propertySchema>;

// Agent Schema
export const agentSchema = z.object({
  id: z.string(),
  name: z.string(),
  title: z.string(),
  phone: z.string(),
  whatsapp: z.string(),
  email: z.string().email(),
  avatar: mediaSrcSchema.optional(),
  bio: z.string(),
  specialties: z.array(z.string()),
  salesCount: z.number().int().nonnegative(),
  rating: z.number().optional(),
  reviewCount: z.number().optional(),
});
export type Agent = z.infer<typeof agentSchema>;

// Testimonial Schema
export const testimonialSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  avatar: mediaSrcSchema,
  comment: z.string(),
  rating: z.number().min(1).max(5),
  propertyTitle: z.string().optional(),
  date: z.string(),
});
export type Testimonial = z.infer<typeof testimonialSchema>;

// BlogPost Schema
export const blogPostSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  content: z.string(),
  coverImage: mediaSrcSchema,
  author: z.object({
    name: z.string(),
    avatar: mediaSrcSchema.optional(),
    role: z.string(),
  }),
  category: z.string(),
  readingTime: z.number().int(),
  createdAt: z.string(),
  tags: z.array(z.string()),
});
export type BlogPost = z.infer<typeof blogPostSchema>;

// FAQItem Schema
export const faqItemSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
  category: z.string(),
});
export type FAQItem = z.infer<typeof faqItemSchema>;

// Filter & Sorting Schema
export const propertyFilterSchema = z.object({
  dealType: z.union([dealTypeSchema, z.literal('all')]).optional(),
  propertyType: z.union([propertyTypeSchema, z.literal('all')]).optional(),
  district: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  minArea: z.number().optional(),
  maxArea: z.number().optional(),
  bedrooms: z.number().optional(),
  search: z.string().optional(),
  isFeatured: z.boolean().optional(),
});
export type PropertyFilters = z.infer<typeof propertyFilterSchema>;

export type PropertySortOption =
  | 'newest'
  | 'priceAsc'
  | 'priceDesc'
  | 'areaAsc'
  | 'areaDesc';
