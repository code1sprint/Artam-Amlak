import { MOCK_PROPERTIES } from '@/data/properties.mock';
import { Property, PropertyFilters, PropertySortOption } from '@/types/schema';

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface GetPropertiesParams {
  filters?: PropertyFilters;
  sort?: PropertySortOption;
  page?: number;
  pageSize?: number;
}

// Simulated network latency
const delay = (ms = 220) => new Promise((resolve) => setTimeout(resolve, ms));

export const propertiesApi = {
  /**
   * Fetch paginated properties with filtering and sorting
   */
  getProperties: async (params: GetPropertiesParams = {}): Promise<PaginatedResponse<Property>> => {
    await delay();

    const {
      filters = {},
      sort = 'newest',
      page = 1,
      pageSize = 9,
    } = params;

    let result = [...MOCK_PROPERTIES];

    // 1. Filter by Deal Type
    if (filters.dealType && filters.dealType !== 'all') {
      result = result.filter((p) => p.dealType === filters.dealType);
    }

    // 2. Filter by Property Type
    if (filters.propertyType && filters.propertyType !== 'all') {
      result = result.filter((p) => p.propertyType === filters.propertyType);
    }

    // 3. Filter by District
    if (filters.district && filters.district !== 'all' && filters.district.trim() !== '') {
      result = result.filter((p) =>
        p.district.toLowerCase().includes(filters.district!.toLowerCase().trim())
      );
    }

    // 4. Filter by Price Range
    if (filters.minPrice !== undefined && filters.minPrice > 0) {
      result = result.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined && filters.maxPrice > 0) {
      result = result.filter((p) => p.price <= filters.maxPrice!);
    }

    // 5. Filter by Area Range
    if (filters.minArea !== undefined && filters.minArea > 0) {
      result = result.filter((p) => p.area >= filters.minArea!);
    }
    if (filters.maxArea !== undefined && filters.maxArea > 0) {
      result = result.filter((p) => p.area <= filters.maxArea!);
    }

    // 6. Filter by Bedrooms
    if (filters.bedrooms !== undefined && filters.bedrooms > 0) {
      result = result.filter((p) => p.bedrooms >= filters.bedrooms!);
    }

    // 7. Filter by Featured flag
    if (filters.isFeatured !== undefined) {
      result = result.filter((p) => p.isFeatured === filters.isFeatured);
    }

    // 8. General Search Text Query
    if (filters.search && filters.search.trim() !== '') {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.district.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.features.some((f) => f.toLowerCase().includes(q))
      );
    }

    // 9. Sorting
    switch (sort) {
      case 'priceAsc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'areaAsc':
        result.sort((a, b) => a.area - b.area);
        break;
      case 'areaDesc':
        result.sort((a, b) => b.area - a.area);
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    // 10. Pagination
    const total = result.length;
    const totalPages = Math.ceil(total / pageSize) || 1;
    const safePage = Math.max(1, Math.min(page, totalPages));
    const startIndex = (safePage - 1) * pageSize;
    const paginatedData = result.slice(startIndex, startIndex + pageSize);

    return {
      data: paginatedData,
      total,
      page: safePage,
      pageSize,
      totalPages,
    };
  },

  /**
   * Fetch single property by slug
   */
  getPropertyBySlug: async (slug: string): Promise<Property | null> => {
    await delay();
    const item = MOCK_PROPERTIES.find((p) => p.slug === slug);
    return item ?? null;
  },

  /**
   * Fetch featured properties for homepage or promotional banners
   */
  getFeatured: async (limit = 6): Promise<Property[]> => {
    await delay();
    return MOCK_PROPERTIES.filter((p) => p.isFeatured).slice(0, limit);
  },

  /**
   * Fetch similar properties based on propertyType and district
   */
  getSimilar: async (property: Property, limit = 4): Promise<Property[]> => {
    await delay();
    return MOCK_PROPERTIES.filter(
      (p) =>
        p.id !== property.id &&
        (p.propertyType === property.propertyType || p.district === property.district)
    ).slice(0, limit);
  },

  /**
   * Fetch properties by a list of IDs (e.g. favorites)
   */
  getByIds: async (ids: string[]): Promise<Property[]> => {
    await delay(120);
    if (!ids.length) return [];
    const idSet = new Set(ids);
    return MOCK_PROPERTIES.filter((p) => idSet.has(p.id));
  },
};
