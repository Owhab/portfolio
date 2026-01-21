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
import { Plus, MoreHorizontal, Pencil, Trash2, Building2, MapPin, Calendar } from 'lucide-react'

export const experienceRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/experience',
  component: ExperiencePage,
})

const experiences = [
  { id: 1, title: 'Senior Frontend Developer', company: 'TechCorp Inc.', location: 'San Francisco, CA', type: 'Full-time', startDate: '2022-06', endDate: null, current: true, description: 'Leading the frontend development team, architecting scalable React applications.', technologies: ['React', 'TypeScript', 'GraphQL'] },
  { id: 2, title: 'Frontend Developer', company: 'StartupXYZ', location: 'New York, NY', type: 'Full-time', startDate: '2020-03', endDate: '2022-05', current: false, description: 'Developed and maintained multiple web applications using React and Vue.js.', technologies: ['React', 'Vue.js', 'Node.js'] },
  { id: 3, title: 'Junior Web Developer', company: 'Digital Agency Co.', location: 'Boston, MA', type: 'Full-time', startDate: '2018-08', endDate: '2020-02', current: false, description: 'Built responsive websites and web applications for various clients.', technologies: ['JavaScript', 'PHP', 'WordPress'] },
]

function formatDate(dateStr: string | null) {
  if (!dateStr) return 'Present'
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function ExperiencePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-3xl font-bold tracking-tight">Experience</h1><p className="text-muted-foreground">Manage your work experience</p></div>
        <Dialog>
          <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" />Add Experience</Button></DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader><DialogTitle>Add Work Experience</DialogTitle><DialogDescription>Add a new position to your experience timeline</DialogDescription></DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4"><div className="grid gap-2"><Label htmlFor="job-title">Job Title</Label><Input id="job-title" placeholder="Senior Developer" /></div><div className="grid gap-2"><Label htmlFor="company">Company</Label><Input id="company" placeholder="Company Name" /></div></div>
              <div className="grid grid-cols-2 gap-4"><div className="grid gap-2"><Label htmlFor="location">Location</Label><Input id="location" placeholder="City, State" /></div><div className="grid gap-2"><Label htmlFor="type">Employment Type</Label><Input id="type" placeholder="Full-time" /></div></div>
              <div className="grid gap-2"><Label htmlFor="description">Description</Label><Textarea id="description" placeholder="Describe your responsibilities..." rows={4} /></div>
            </div>
            <DialogFooter><Button variant="outline">Cancel</Button><Button>Save Experience</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block" />
        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <Card key={exp.id} className="relative md:ml-16">
              <div className="absolute -left-[4.5rem] top-6 hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">{idx + 1}</div>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <CardTitle className="text-xl">{exp.title}</CardTitle>
                      {exp.current && <Badge className="bg-emerald-500/10 text-emerald-600">Current</Badge>}
                      <Badge variant="outline">{exp.type}</Badge>
                    </div>
                    <CardDescription className="flex items-center gap-4 flex-wrap">
                      <span className="flex items-center gap-1"><Building2 className="h-4 w-4" />{exp.company}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{exp.location}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                    </CardDescription>
                  </div>
                  <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8 shrink-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem><Pencil className="mr-2 h-4 w-4" />Edit</DropdownMenuItem><DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                <div className="flex flex-wrap gap-2">{exp.technologies.map((tech) => (<Badge key={tech} variant="secondary">{tech}</Badge>))}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
