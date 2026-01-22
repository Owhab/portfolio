import { apiClient } from '@/lib/api-client';
import type { Project, CreateProjectDto, UpdateProjectDto } from '@/types';

interface ProjectsResponse {
  data: Project[];
}

interface ProjectResponse {
  data: Project;
}

export const projectsService = {
  /**
   * Get all projects
   */
  async getAll(): Promise<Project[]> {
    const response = await apiClient.get<ProjectsResponse>('/projects');
    return response.data || [];
  },

  /**
   * Create a new project
   */
  async create(data: CreateProjectDto): Promise<Project> {
    const response = await apiClient.post<ProjectResponse>('/projects', data);
    return response.data;
  },

  /**
   * Update a project by ID
   */
  async update(id: number, data: UpdateProjectDto): Promise<Project> {
    const response = await apiClient.patch<ProjectResponse>(`/projects/${id}`, data);
    return response.data;
  },

  /**
   * Delete a project by ID
   */
  async delete(id: number): Promise<void> {
    return apiClient.delete<void>(`/projects/${id}`);
  },
};
