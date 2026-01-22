import { apiClient } from '@/lib/api-client';
import type { SkillCategory, CreateSkillCategoryDto, UpdateSkillCategoryDto } from '@/types';

interface SkillCategoriesResponse {
  data: SkillCategory[];
}

export const skillCategoriesService = {
  /**
   * Get all skill categories
   */
  async getAll(): Promise<SkillCategory[]> {
    const response = await apiClient.get<SkillCategoriesResponse>('/skill-category');
    return response.data || [];
  },

  /**
   * Create a new skill category
   */
  async create(data: CreateSkillCategoryDto): Promise<SkillCategory> {
    return apiClient.post<SkillCategory>('/skill-category', data);
  },

  /**
   * Update a skill category by ID
   */
  async update(id: number, data: UpdateSkillCategoryDto): Promise<SkillCategory> {
    return apiClient.patch<SkillCategory>(`/skill-category/${id}`, data);
  },

  /**
   * Delete a skill category by ID
   */
  async delete(id: number): Promise<void> {
    return apiClient.delete<void>(`/skill-category/${id}`);
  },
};
