import { apiClient } from "@/lib/api-client";
import type { Blog, CreateBlogDto, UpdateBlogDto } from "@/types";

interface BlogsResponse {
  data: Blog[];
}

interface BlogResponse {
  data: Blog;
}

export const blogsService = {
  /**
   * Get all blogs
   */
  async getAll(): Promise<Blog[]> {
    const response = await apiClient.get<BlogsResponse>("/blogs");
    return response.data || [];
  },

  /**
   * Get a single blog by ID
   */
  async getById(id: number): Promise<Blog> {
    const response = await apiClient.get<BlogResponse>(`/blogs/${id}`);
    return response.data;
  },

  /**
   * Create a new blog
   */
  async create(data: CreateBlogDto): Promise<Blog> {
    const response = await apiClient.post<Blog>("/blogs", data);
    return response;
  },

  /**
   * Update a blog by ID
   */
  async update(id: number, data: UpdateBlogDto): Promise<Blog> {
    const response = await apiClient.patch<Blog>(`/blogs/${id}`, data);
    return response;
  },

  /**
   * Delete a blog by ID
   */
  async delete(id: number): Promise<void> {
    return apiClient.delete<void>(`/blogs/${id}`);
  },
};
