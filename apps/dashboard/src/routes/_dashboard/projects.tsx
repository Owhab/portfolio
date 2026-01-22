import { createRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { dashboardLayoutRoute } from '../_dashboard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Plus, MoreHorizontal, Pencil, Trash2, ExternalLink, Github, Search, Filter, Loader2, FolderKanban } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useProjects, useCreateProject, useUpdateProject, useDeleteProject } from '@/hooks/use-projects'
import type { Project, CreateProjectDto } from '@/types'

export const projectsRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/projects',
  component: ProjectsPage,
})

function ProjectsPage() {
  const { data: projects, isLoading, error } = useProjects()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingProject(null)
  }

  const filteredProjects = projects?.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.techStack?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={() => setEditingProject(null)}>
              <Plus className="h-4 w-4" />Add Project
            </Button>
          </DialogTrigger>
          <ProjectDialog 
            project={editingProject} 
            onClose={handleCloseDialog} 
          />
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search projects..." 
                className="pl-9" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="aspect-video w-full" />
              <CardHeader className="pb-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-12 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : error ? (
        <Card>
          <CardContent className="p-6">
            <p className="text-destructive">Failed to load projects. Please try again.</p>
          </CardContent>
        </Card>
      ) : filteredProjects && filteredProjects.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project}
              onEdit={handleEdit}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <FolderKanban className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {searchTerm ? 'No projects match your search.' : 'No projects yet. Add your first one!'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function ProjectCard({ project, onEdit }: { project: Project; onEdit: (project: Project) => void }) {
  const deleteProject = useDeleteProject()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this project?')) return
    setIsDeleting(true)
    try {
      await deleteProject.mutateAsync(project.id)
    } finally {
      setIsDeleting(false)
    }
  }

  const technologies = project.techStack?.split(',').map(t => t.trim()).filter(Boolean) || []

  return (
    <Card className={`overflow-hidden group ${!project.isActive ? 'opacity-60' : ''}`}>
      <div className="relative aspect-video overflow-hidden bg-muted">
        {project.thumbnail ? (
          <img 
            src={project.thumbnail} 
            alt={project.title} 
            className="object-cover w-full h-full transition-transform group-hover:scale-105" 
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <FolderKanban className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            {project.githubUrl && (
              <Button size="sm" variant="secondary" className="gap-1" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />Code
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button size="sm" variant="secondary" className="gap-1" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />Live
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-lg">{project.title}</CardTitle>
            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
              {project.isFeatured && <Badge variant="default">Featured</Badge>}
              {!project.isActive && <Badge variant="secondary">Inactive</Badge>}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" disabled={isDeleting}>
                {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(project)}>
                <Pencil className="mr-2 h-4 w-4" />Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
                <Trash2 className="mr-2 h-4 w-4" />Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs font-normal">{tech}</Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const createProject = useCreateProject()
  const updateProject = useUpdateProject()
  const isEditing = !!project

  const [formData, setFormData] = useState<CreateProjectDto>({
    title: project?.title || '',
    description: project?.description || '',
    longDescription: project?.longDescription || '',
    thumbnail: project?.thumbnail || '',
    techStack: project?.techStack || '',
    liveUrl: project?.liveUrl || '',
    githubUrl: project?.githubUrl || '',
    sortOrder: project?.sortOrder || 0,
    isFeatured: project?.isFeatured || false,
    isActive: project?.isActive ?? true,
  })

  const isSubmitting = createProject.isPending || updateProject.isPending

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isEditing && project) {
        await updateProject.mutateAsync({ id: project.id, data: formData })
      } else {
        await createProject.mutateAsync(formData)
      }
      onClose()
    } catch (error) {
      console.error('Failed to save project:', error)
    }
  }

  return (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Project' : 'Add New Project'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update your project details' : 'Add a new project to your portfolio'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Project Title *</Label>
            <Input 
              id="title" 
              placeholder="My Awesome Project" 
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Short Description *</Label>
            <Textarea 
              id="description" 
              placeholder="A brief description of your project..." 
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="longDescription">Detailed Description</Label>
            <Textarea 
              id="longDescription" 
              placeholder="A detailed description of your project..." 
              rows={4}
              value={formData.longDescription}
              onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="thumbnail">Thumbnail URL</Label>
            <Input 
              id="thumbnail" 
              placeholder="https://example.com/image.jpg" 
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="techStack">Technologies (comma-separated)</Label>
            <Input 
              id="techStack" 
              placeholder="React, TypeScript, Node.js" 
              value={formData.techStack}
              onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input 
                id="githubUrl" 
                placeholder="https://github.com/..." 
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="liveUrl">Live URL</Label>
              <Input 
                id="liveUrl" 
                placeholder="https://..." 
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="isFeatured" 
                checked={formData.isFeatured}
                onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: checked })}
              />
              <Label htmlFor="isFeatured">Featured project</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                id="isActive" 
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label htmlFor="isActive">Show on portfolio</Label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              isEditing ? 'Update Project' : 'Save Project'
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
