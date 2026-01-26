import { apiClient } from '@/lib/api-client';
import type { BlogTag, CreateBlogTagDto, UpdateBlogTagDto } from '@/types';

interface BlogTagsResponse {
  data: BlogTag[];
}

interface BlogTagResponse {
  data: BlogTag;
}

export const blogTagsService = {
  /**
   * Get all blog tags
   */
  async getAll(): Promise<BlogTag[]> {
    const response = await apiClient.get<BlogTagsResponse>('/blog-tags');
    return response.data || [];
  },

  /**
   * Create a new blog tag
   */
  async create(data: CreateBlogTagDto): Promise<BlogTag> {
    const response = await apiClient.post<BlogTagResponse>('/blog-tags', data);
    return response.data;
  },

  /**
   * Update a blog tag by ID
   */
  async update(id: number, data: UpdateBlogTagDto): Promise<BlogTag> {
    const response = await apiClient.patch<BlogTagResponse>(`/blog-tags/${id}`, data);
    return response.data;
  },

  /**
   * Delete a blog tag by ID
   */
  async delete(id: number): Promise<void> {
    return apiClient.delete<void>(`/blog-tags/${id}`);
  },
};
