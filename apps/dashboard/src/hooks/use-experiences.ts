import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { experiencesService } from '@/services/experiences.service';
import type { CreateExperienceDto, UpdateExperienceDto } from '@/types';

const QUERY_KEY = ['experiences'];

export function useExperiences() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: experiencesService.getAll,
  });
}

export function useCreateExperience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateExperienceDto) => experiencesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useUpdateExperience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateExperienceDto }) =>
      experiencesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useDeleteExperience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => experiencesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
