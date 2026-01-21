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
import { Plus, MoreHorizontal, Pencil, Trash2, GraduationCap, MapPin, Calendar, Award } from 'lucide-react'

export const educationRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/education',
  component: EducationPage,
})

const education = [
  { id: 1, degree: 'Master of Science in Computer Science', institution: 'Stanford University', location: 'Stanford, CA', startDate: '2016-09', endDate: '2018-06', gpa: '3.9/4.0', description: 'Specialized in Machine Learning and Distributed Systems.', achievements: ['Summa Cum Laude', "Dean's List"] },
  { id: 2, degree: 'Bachelor of Science in Software Engineering', institution: 'MIT', location: 'Cambridge, MA', startDate: '2012-09', endDate: '2016-05', gpa: '3.8/4.0', description: 'Comprehensive program covering software development and algorithms.', achievements: ['Honors Graduate'] },
]

const certifications = [
  { name: 'AWS Solutions Architect Professional', issuer: 'Amazon Web Services', date: '2023-06' },
  { name: 'Google Cloud Professional Developer', issuer: 'Google', date: '2023-03' },
  { name: 'Meta Frontend Developer Certificate', issuer: 'Meta', date: '2022-09' },
]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function EducationPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-3xl font-bold tracking-tight">Education</h1><p className="text-muted-foreground">Manage your education and certifications</p></div>
        <Dialog>
          <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" />Add Education</Button></DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader><DialogTitle>Add Education</DialogTitle><DialogDescription>Add your educational background</DialogDescription></DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2"><Label htmlFor="degree">Degree</Label><Input id="degree" placeholder="Bachelor of Science" /></div>
              <div className="grid grid-cols-2 gap-4"><div className="grid gap-2"><Label htmlFor="institution">Institution</Label><Input id="institution" placeholder="University Name" /></div><div className="grid gap-2"><Label htmlFor="location">Location</Label><Input id="location" placeholder="City, State" /></div></div>
              <div className="grid gap-2"><Label htmlFor="description">Description</Label><Textarea id="description" placeholder="Describe your studies..." rows={3} /></div>
            </div>
            <DialogFooter><Button variant="outline">Cancel</Button><Button>Save Education</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2"><GraduationCap className="h-5 w-5" />Education</h2>
        <div className="grid gap-4">
          {education.map((edu) => (
            <Card key={edu.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{edu.degree}</CardTitle>
                    <CardDescription className="flex items-center gap-4 flex-wrap">
                      <span className="font-medium text-foreground">{edu.institution}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{edu.location}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                      <Badge variant="secondary">GPA: {edu.gpa}</Badge>
                    </CardDescription>
                  </div>
                  <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8 shrink-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem><Pencil className="mr-2 h-4 w-4" />Edit</DropdownMenuItem><DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{edu.description}</p>
                <div className="flex flex-wrap gap-2">{edu.achievements.map((a) => (<Badge key={a} variant="outline" className="gap-1"><Award className="h-3 w-3" />{a}</Badge>))}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2"><Award className="h-5 w-5" />Certifications</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {certifications.map((cert) => (
            <Card key={cert.name} className="group">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{cert.name}</p>
                    <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                    <p className="text-xs text-muted-foreground">Issued: {formatDate(cert.date)}</p>
                  </div>
                  <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem><Pencil className="mr-2 h-4 w-4" />Edit</DropdownMenuItem><DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
