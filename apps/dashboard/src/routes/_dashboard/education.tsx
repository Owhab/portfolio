import { createRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
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
import { Plus, MoreHorizontal, Pencil, Trash2, GraduationCap, MapPin, Calendar, Loader2 } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useEducations, useCreateEducation, useUpdateEducation, useDeleteEducation } from '@/hooks/use-educations'
import type { Education, CreateEducationDto } from '@/types'

export const educationRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/education',
  component: EducationPage,
})

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function EducationPage() {
  const { data: educations, isLoading, error } = useEducations()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEducation, setEditingEducation] = useState<Education | null>(null)

  const handleEdit = (education: Education) => {
    setEditingEducation(education)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingEducation(null)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Education</h1>
          <p className="text-muted-foreground">Manage your education history</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={() => setEditingEducation(null)}>
              <Plus className="h-4 w-4" />Add Education
            </Button>
          </DialogTrigger>
          <EducationDialog 
            education={editingEducation} 
            onClose={handleCloseDialog} 
          />
        </Dialog>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />Education
        </h2>
        
        {isLoading ? (
          <div className="grid gap-4">
            {[1, 2].map((i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2 mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-16 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Card>
            <CardContent className="p-6">
              <p className="text-destructive">Failed to load education data. Please try again.</p>
            </CardContent>
          </Card>
        ) : educations && educations.length > 0 ? (
          <div className="grid gap-4">
            {educations.map((edu) => (
              <EducationCard 
                key={edu.id} 
                education={edu} 
                onEdit={handleEdit}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No education records yet. Add your first one!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

function EducationCard({ education, onEdit }: { education: Education; onEdit: (edu: Education) => void }) {
  const deleteEducation = useDeleteEducation()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this education record?')) return
    setIsDeleting(true)
    try {
      await deleteEducation.mutateAsync(education.id)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card className={!education.isActive ? 'opacity-60' : ''}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-lg">{education.degree}</CardTitle>
            <CardDescription className="flex items-center gap-4 flex-wrap">
              <span className="font-medium text-foreground">{education.institution}</span>
              {education.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />{education.location}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(education.startDate)} - {education.isCurrent ? 'Present' : education.endDate ? formatDate(education.endDate) : 'N/A'}
              </span>
              {!education.isActive && <Badge variant="secondary">Inactive</Badge>}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" disabled={isDeleting}>
                {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(education)}>
                <Pencil className="mr-2 h-4 w-4" />Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
                <Trash2 className="mr-2 h-4 w-4" />Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      {education.description && (
        <CardContent>
          <p className="text-sm text-muted-foreground">{education.description}</p>
        </CardContent>
      )}
    </Card>
  )
}

function EducationDialog({ education, onClose }: { education: Education | null; onClose: () => void }) {
  const createEducation = useCreateEducation()
  const updateEducation = useUpdateEducation()
  const isEditing = !!education

  const [formData, setFormData] = useState<CreateEducationDto>({
    degree: '',
    institution: '',
    location: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    description: '',
    sortOrder: 0,
    isActive: true,
  })

  // Update form data when education changes (for editing)
  useEffect(() => {
    if (education) {
      setFormData({
        degree: education.degree || '',
        institution: education.institution || '',
        location: education.location || '',
        startDate: education.startDate?.split('T')[0] || '',
        endDate: education.endDate?.split('T')[0] || '',
        isCurrent: education.isCurrent || false,
        description: education.description || '',
        sortOrder: education.sortOrder || 0,
        isActive: education.isActive ?? true,
      })
    } else {
      setFormData({
        degree: '',
        institution: '',
        location: '',
        startDate: '',
        endDate: '',
        isCurrent: false,
        description: '',
        sortOrder: 0,
        isActive: true,
      })
    }
  }, [education])

  const isSubmitting = createEducation.isPending || updateEducation.isPending

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isEditing && education) {
        await updateEducation.mutateAsync({ id: education.id, data: formData })
      } else {
        await createEducation.mutateAsync(formData)
      }
      onClose()
    } catch (error) {
      console.error('Failed to save education:', error)
    }
  }

  return (
    <DialogContent className="max-w-2xl">
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Education' : 'Add Education'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update your educational background' : 'Add your educational background'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="degree">Degree *</Label>
            <Input 
              id="degree" 
              placeholder="Bachelor of Science in Computer Science" 
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="institution">Institution *</Label>
              <Input 
                id="institution" 
                placeholder="University Name" 
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                placeholder="City, Country" 
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input 
                id="startDate" 
                type="date" 
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input 
                id="endDate" 
                type="date" 
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                disabled={formData.isCurrent}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch 
              id="isCurrent" 
              checked={formData.isCurrent}
              onCheckedChange={(checked) => setFormData({ ...formData, isCurrent: checked, endDate: checked ? '' : formData.endDate })}
            />
            <Label htmlFor="isCurrent">Currently studying here</Label>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Describe your studies, achievements, etc." 
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
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
              isEditing ? 'Update Education' : 'Save Education'
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
