import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { educationsService } from '@/services/educations.service';
import type { CreateEducationDto, UpdateEducationDto } from '@/types';

const QUERY_KEY = ['educations'];

export function useEducations() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: educationsService.getAll,
  });
}

export function useCreateEducation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEducationDto) => educationsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useUpdateEducation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateEducationDto }) =>
      educationsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useDeleteEducation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => educationsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
