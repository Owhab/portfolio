import { apiClient } from '@/lib/api-client';
import type { Education, CreateEducationDto, UpdateEducationDto } from '@/types';

interface EducationResponse {
  data: Education;
  message?: string;
}

export const educationsService = {
  /**
   * Get all educations
   * Note: Education API returns array directly, not wrapped in { data: [] }
   */
  async getAll(): Promise<Education[]> {
    const response = await apiClient.get<Education[] | { data: Education[] }>('/educations');
    // Handle both array and wrapped response formats
    return Array.isArray(response) ? response : (response.data || []);
  },

  /**
   * Create a new education
   */
  async create(data: CreateEducationDto): Promise<Education> {
    const response = await apiClient.post<EducationResponse>('/educations', data);
    return response.data;
  },

  /**
   * Update an education by ID
   */
  async update(id: number, data: UpdateEducationDto): Promise<Education> {
    const response = await apiClient.patch<EducationResponse>(`/educations/${id}`, data);
    return response.data;
  },

  /**
   * Delete an education by ID
   */
  async delete(id: number): Promise<void> {
    return apiClient.delete<void>(`/educations/${id}`);
  },
};
