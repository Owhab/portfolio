import { apiClient } from '@/lib/api-client';
import type { Settings, CreateSettingsDto, UpdateSettingsDto, SettingsResponse } from '@/types';

export const settingsService = {
  /**
   * Get settings
   */
  async get(): Promise<Settings | null> {
    const response = await apiClient.get<SettingsResponse>('/settings');
    return response.settings;
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
