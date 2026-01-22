import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsService } from '@/services/settings.service';
import type { CreateSettingsDto, UpdateSettingsDto } from '@/types';

const QUERY_KEY = ['settings'];

export function useSettings() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: settingsService.get,
  });
}

export function useCreateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSettingsDto) => settingsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateSettingsDto) => settingsService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
