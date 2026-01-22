import { apiClient } from '@/lib/api-client';
import type { Settings, CreateSettingsDto, UpdateSettingsDto } from '@/types';

interface SettingsApiResponse {
  settings: Settings[] | Settings;
}

export const settingsService = {
  /**
   * Get settings
   * Note: API returns { settings: [...] } as an array, we take the first one
   */
  async get(): Promise<Settings | null> {
    const response = await apiClient.get<SettingsApiResponse>('/settings');
    // Handle both array and single object response
    if (Array.isArray(response.settings)) {
      return response.settings[0] || null;
    }
    return response.settings || null;
  },

  /**
   * Create settings (first time setup)
   */
  async create(data: CreateSettingsDto): Promise<Settings> {
    return apiClient.post<Settings>('/settings', data);
  },

  /**
   * Update settings
   */
  async update(data: UpdateSettingsDto): Promise<Settings> {
    return apiClient.patch<Settings>('/settings', data);
  },
};
