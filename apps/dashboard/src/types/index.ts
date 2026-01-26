// ============================================
// Enums (matching API enums)
// ============================================

export enum SkillLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert',
}

export enum Language {
  BANGLA = 'bn',
  ENGLISH = 'en',
}

export enum Provider {
  LOCAL = 'local',
  GOOGLE = 'google',
  GITHUB = 'github',
}

// ============================================
// Auth Types
// ============================================

export interface User {
  id: number;
  email: string;
  googleId?: string;
  githubId?: string;
  provider: Provider;
  isActive: boolean;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
}

// ============================================
// Education Types
// ============================================

export interface Education {
  id: number;
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEducationDto {
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  description?: string;
  sortOrder?: number;
  isActive?: boolean;
}

export interface UpdateEducationDto extends Partial<CreateEducationDto> {}

// ============================================
// Experience Types
// ============================================

export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string | null;
  description?: string | null;
  isCurrent: boolean;
  techStack?: string;
  sortOrder?: number;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateExperienceDto {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string | null;
  description?: string | null;
  isCurrent: boolean;
  techStack?: string;
  sortOrder?: number;
  isActive?: boolean;
}

export interface UpdateExperienceDto extends Partial<CreateExperienceDto> {}

// ============================================
// Project Types
// ============================================

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  thumbnail?: string;
  techStack: string;
  liveUrl?: string;
  githubUrl?: string;
  sortOrder: number;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectDto {
  title: string;
  description: string;
  longDescription?: string;
  thumbnail?: string;
  techStack?: string;
  liveUrl?: string;
  githubUrl?: string;
  sortOrder?: number;
  isFeatured?: boolean;
  isActive?: boolean;
}

export interface UpdateProjectDto extends Partial<CreateProjectDto> {}

// ============================================
// Skill Category Types
// ============================================

export interface SkillCategory {
  id: number;
  name: string;
  sortOrder: number;
  isActive: boolean;
  skills?: Skill[];
}

export interface CreateSkillCategoryDto {
  name: string;
  sortOrder?: number;
  isActive?: boolean;
}

export interface UpdateSkillCategoryDto extends Partial<CreateSkillCategoryDto> {}

// ============================================
// Skill Types
// ============================================

export interface Skill {
  id: number;
  name: string;
  level: SkillLevel;
  image: string;
  order: number;
  isActive: boolean;
  category: SkillCategory;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSkillDto {
  name: string;
  level?: SkillLevel;
  image?: string;
  order?: number;
  isActive?: boolean;
  categoryId: number;
}

export interface UpdateSkillDto extends Partial<CreateSkillDto> {}

// ============================================
// Settings Types
// ============================================

export interface Settings {
  id: number;
  siteName: string;
  siteShortName: string;
  siteDescription: string;
  siteUrl: string;
  siteLogo: string;
  favicon: string;
  themeColor: string;
  defaultLanguage: Language;
}

export interface CreateSettingsDto {
  siteName: string;
  siteShortName: string;
  siteDescription: string;
  siteUrl: string;
  siteLogo: string;
  favicon: string;
  themeColor: string;
  defaultLanguage: Language;
}

export interface UpdateSettingsDto extends Partial<CreateSettingsDto> {}

// ============================================
// Blog Tag Types
// ============================================

export interface BlogTag {
  id: number;
  name: string;
  usageCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogTagDto {
  name: string;
  isActive?: boolean;
}

export interface UpdateBlogTagDto extends Partial<CreateBlogTagDto> {}

// ============================================
// Blog Types
// ============================================

export interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  isPublished: boolean;
  publishedAt: string;
  isFeatured: boolean;
  readTime: number;
  tags: BlogTag[];
  seoTitle: string;
  seoDescription: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogDto {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  isPublished?: boolean;
  publishedAt?: string;
  isFeatured?: boolean;
  readTime?: number;
  tagIds?: number[];
  seoTitle: string;
  seoDescription: string;
}

export interface UpdateBlogDto extends Partial<CreateBlogDto> {}

// ============================================
// API Response Types
// ============================================

export interface SettingsResponse {
  settings: Settings | null;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
}
