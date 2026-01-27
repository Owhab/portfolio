import { apiClient } from "@/lib/api-client";
import type { Skill, CreateSkillDto, UpdateSkillDto } from "@/types";

interface SkillResponse {
  message?: string;
  skill: Skill;
}

export const skillsService = {
  /**
   * Get all skills
   * Note: Skills API returns array directly
   */
  async getAll(): Promise<Skill[]> {
    const response = await apiClient.get<Skill[] | { data: Skill[] }>(
      "/skills",
    );
    // Handle both array and wrapped response formats
    return Array.isArray(response) ? response : response.data || [];
  },

  /**
   * Create a new skill
   */
  async create(data: CreateSkillDto): Promise<Skill> {
    const response = await apiClient.post<SkillResponse>("/skills", data);
    return response.skill;
  },

  /**
   * Update a skill by ID
   */
  async update(id: number, data: UpdateSkillDto): Promise<Skill> {
    const response = await apiClient.patch<SkillResponse>(
      `/skills/${id}`,
      data,
    );
    return response.skill;
  },

  /**
   * Delete a skill by ID
   */
  async delete(id: number): Promise<void> {
    return apiClient.delete<void>(`/skills/${id}`);
  },
};
