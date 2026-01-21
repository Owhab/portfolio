import { createRoute } from '@tanstack/react-router'
import { dashboardLayoutRoute } from '../_dashboard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Plus, MoreHorizontal, Pencil, Trash2, Search } from 'lucide-react'

export const skillsRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/skills',
  component: SkillsPage,
})

const skillCategories = [
  { name: 'Frontend', skills: [{ name: 'React', level: 95, years: 4 }, { name: 'TypeScript', level: 90, years: 3 }, { name: 'Next.js', level: 85, years: 2 }, { name: 'Tailwind CSS', level: 95, years: 3 }] },
  { name: 'Backend', skills: [{ name: 'Node.js', level: 90, years: 4 }, { name: 'Python', level: 80, years: 3 }, { name: 'PostgreSQL', level: 85, years: 3 }, { name: 'MongoDB', level: 75, years: 2 }] },
  { name: 'Tools & DevOps', skills: [{ name: 'Git', level: 95, years: 5 }, { name: 'Docker', level: 80, years: 2 }, { name: 'AWS', level: 75, years: 2 }] },
  { name: 'Soft Skills', skills: [{ name: 'Problem Solving', level: 95, years: 5 }, { name: 'Communication', level: 90, years: 5 }, { name: 'Team Leadership', level: 85, years: 3 }] },
]

function SkillsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-3xl font-bold tracking-tight">Skills</h1><p className="text-muted-foreground">Manage your technical and soft skills</p></div>
        <Dialog>
          <DialogTrigger asChild><Button className="gap-2"><Plus className="h-4 w-4" />Add Skill</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Skill</DialogTitle><DialogDescription>Add a new skill to your portfolio</DialogDescription></DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2"><Label htmlFor="skill-name">Skill Name</Label><Input id="skill-name" placeholder="React, Python, etc." /></div>
              <div className="grid gap-2"><Label htmlFor="category">Category</Label><Select><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger><SelectContent><SelectItem value="frontend">Frontend</SelectItem><SelectItem value="backend">Backend</SelectItem><SelectItem value="tools">Tools & DevOps</SelectItem><SelectItem value="soft">Soft Skills</SelectItem></SelectContent></Select></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2"><Label htmlFor="level">Proficiency (%)</Label><Input id="level" type="number" placeholder="85" min="0" max="100" /></div>
                <div className="grid gap-2"><Label htmlFor="years">Years of Experience</Label><Input id="years" type="number" placeholder="3" min="0" /></div>
              </div>
            </div>
            <DialogFooter><Button variant="outline">Cancel</Button><Button>Save Skill</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card><CardContent className="p-4"><div className="relative max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search skills..." className="pl-9" /></div></CardContent></Card>

      <div className="grid gap-6 md:grid-cols-2">
        {skillCategories.map((category) => (
          <Card key={category.name}>
            <CardHeader><CardTitle className="text-lg">{category.name}</CardTitle><CardDescription>{category.skills.length} skills</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              {category.skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><span className="font-medium text-sm">{skill.name}</span><Badge variant="secondary" className="text-xs">{skill.years}y</Badge></div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem><Pencil className="mr-2 h-4 w-4" />Edit</DropdownMenuItem><DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden"><div className="h-full bg-primary rounded-full transition-all" style={{ width: `${skill.level}%` }} /></div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
