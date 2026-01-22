import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { skillsService } from '@/services/skills.service';
import { skillCategoriesService } from '@/services/skill-categories.service';
import type { 
  CreateSkillDto, 
  UpdateSkillDto, 
  CreateSkillCategoryDto, 
  UpdateSkillCategoryDto 
} from '@/types';

const SKILLS_QUERY_KEY = ['skills'];
const CATEGORIES_QUERY_KEY = ['skill-categories'];

// Skills hooks
export function useSkills() {
  return useQuery({
    queryKey: SKILLS_QUERY_KEY,
    queryFn: skillsService.getAll,
  });
}

export function useCreateSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSkillDto) => skillsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SKILLS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
    },
  });
}

export function useUpdateSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateSkillDto }) =>
      skillsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SKILLS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
    },
  });
}

export function useDeleteSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => skillsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SKILLS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
    },
  });
}

// Skill Categories hooks
export function useSkillCategories() {
  return useQuery({
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: skillCategoriesService.getAll,
  });
}

export function useCreateSkillCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSkillCategoryDto) => skillCategoriesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
    },
  });
}

export function useUpdateSkillCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateSkillCategoryDto }) =>
      skillCategoriesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
    },
  });
}

export function useDeleteSkillCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => skillCategoriesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: SKILLS_QUERY_KEY });
    },
  });
}
