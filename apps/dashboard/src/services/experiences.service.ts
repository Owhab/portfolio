import { apiClient } from '@/lib/api-client';
import type { Experience, CreateExperienceDto, UpdateExperienceDto } from '@/types';

interface ExperiencesResponse {
  data: Experience[];
}

interface ExperienceResponse {
  data: Experience;
}

export const experiencesService = {
  /**
   * Get all experiences
   */
  async getAll(): Promise<Experience[]> {
    const response = await apiClient.get<ExperiencesResponse>('/experiences');
    return response.data || [];
  },

  /**
   * Create a new experience
   */
  async create(data: CreateExperienceDto): Promise<Experience> {
    const response = await apiClient.post<ExperienceResponse>('/experiences', data);
    return response.data;
  },

  /**
   * Update an experience by ID
   */
  async update(id: number, data: UpdateExperienceDto): Promise<Experience> {
    const response = await apiClient.patch<ExperienceResponse>(`/experiences/${id}`, data);
    return response.data;
  },

  /**
   * Delete an experience by ID
   */
  async delete(id: number): Promise<void> {
    return apiClient.delete<void>(`/experiences/${id}`);
  },
};
