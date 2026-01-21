import { createRoute } from '@tanstack/react-router'
import { dashboardLayoutRoute } from '../_dashboard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Plus, MoreHorizontal, Pencil, Trash2, ExternalLink, Github, Eye, Calendar, Search, Filter } from 'lucide-react'

export const projectsRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/projects',
  component: ProjectsPage,
})

const projects = [
  { id: 1, title: 'E-commerce Platform', description: 'A full-stack e-commerce solution with payment integration.', image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=400&h=300&fit=crop', status: 'completed', technologies: ['React', 'Node.js', 'PostgreSQL'], github: 'https://github.com', live: 'https://example.com', views: 1234, date: '2024-01-15' },
  { id: 2, title: 'Portfolio Dashboard', description: 'An admin dashboard for managing portfolio content.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop', status: 'in-progress', technologies: ['TypeScript', 'React', 'Tailwind'], github: 'https://github.com', live: null, views: 567, date: '2024-02-20' },
  { id: 3, title: 'Mobile Banking App', description: 'A secure mobile banking application.', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop', status: 'completed', technologies: ['React Native', 'Firebase'], github: 'https://github.com', live: 'https://example.com', views: 2341, date: '2023-11-10' },
  { id: 4, title: 'AI Chat Assistant', description: 'An intelligent chatbot powered by GPT-4.', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop', status: 'planning', technologies: ['Python', 'OpenAI', 'FastAPI'], github: 'https://github.com', live: null, views: 189, date: '2024-03-01' },
]

const statusColors: Record<string, string> = {
  'completed': 'bg-emerald-500/10 text-emerald-600',
  'in-progress': 'bg-blue-500/10 text-blue-600',
  'planning': 'bg-amber-500/10 text-amber-600',
}

function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="h-4 w-4" />Add Project</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
              <DialogDescription>Add a new project to your portfolio</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2"><Label htmlFor="title">Project Title</Label><Input id="title" placeholder="My Awesome Project" /></div>
              <div className="grid gap-2"><Label htmlFor="description">Description</Label><Textarea id="description" placeholder="Describe your project..." rows={3} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2"><Label htmlFor="github">GitHub URL</Label><Input id="github" placeholder="https://github.com/..." /></div>
                <div className="grid gap-2"><Label htmlFor="live">Live URL</Label><Input id="live" placeholder="https://..." /></div>
              </div>
            </div>
            <DialogFooter><Button variant="outline">Cancel</Button><Button>Save Project</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search projects..." className="pl-9" /></div>
            <div className="flex gap-2"><Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button><Button variant="outline">All Status</Button></div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden group">
            <div className="relative aspect-video overflow-hidden">
              <img src={project.image} alt={project.title} className="object-cover w-full h-full transition-transform group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                  {project.github && <Button size="sm" variant="secondary" className="gap-1"><Github className="h-4 w-4" />Code</Button>}
                  {project.live && <Button size="sm" variant="secondary" className="gap-1"><ExternalLink className="h-4 w-4" />Live</Button>}
                </div>
              </div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(project.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                    <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{project.views}</span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem><Pencil className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <CardDescription className="line-clamp-2">{project.description}</CardDescription>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">{project.technologies.map((tech) => (<Badge key={tech} variant="secondary" className="text-xs font-normal">{tech}</Badge>))}</div>
                <Badge className={statusColors[project.status]}>{project.status}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
