import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { blogsService } from "@/services/blogs.service";
import { blogTagsService } from "@/services/blog-tags.service";
import type {
  CreateBlogDto,
  UpdateBlogDto,
  CreateBlogTagDto,
  UpdateBlogTagDto,
} from "@/types";

const BLOGS_QUERY_KEY = ["blogs"];
const BLOG_TAGS_QUERY_KEY = ["blog-tags"];

// ============================================
// Blog Hooks
// ============================================

export function useBlogs() {
  return useQuery({
    queryKey: BLOGS_QUERY_KEY,
    queryFn: blogsService.getAll,
  });
}

export function useBlog(id: number) {
  return useQuery({
    queryKey: [...BLOGS_QUERY_KEY, id],
    queryFn: () => blogsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBlogDto) => blogsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOGS_QUERY_KEY });
    },
  });
}

export function useUpdateBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateBlogDto }) =>
      blogsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOGS_QUERY_KEY });
    },
  });
}

export function useDeleteBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => blogsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOGS_QUERY_KEY });
    },
  });
}

// ============================================
// Blog Tag Hooks
// ============================================

export function useBlogTags() {
  return useQuery({
    queryKey: BLOG_TAGS_QUERY_KEY,
    queryFn: blogTagsService.getAll,
  });
}

export function useCreateBlogTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBlogTagDto) => blogTagsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOG_TAGS_QUERY_KEY });
    },
  });
}

export function useUpdateBlogTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateBlogTagDto }) =>
      blogTagsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOG_TAGS_QUERY_KEY });
    },
  });
}

export function useDeleteBlogTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => blogTagsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOG_TAGS_QUERY_KEY });
    },
  });
}
