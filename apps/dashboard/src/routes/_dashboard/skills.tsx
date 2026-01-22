import { createRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { dashboardLayoutRoute } from '../_dashboard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, MoreHorizontal, Pencil, Trash2, Search, Loader2, Sparkles, FolderTree } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { 
  useSkills, 
  useSkillCategories, 
  useCreateSkill, 
  useUpdateSkill, 
  useDeleteSkill,
  useCreateSkillCategory,
  useUpdateSkillCategory,
  useDeleteSkillCategory
} from '@/hooks/use-skills'
import type { Skill, CreateSkillDto, SkillCategory, CreateSkillCategoryDto } from '@/types'
import { SkillLevel } from '@/types'

export const skillsRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/skills',
  component: SkillsPage,
})

const skillLevelLabels: Record<SkillLevel, string> = {
  [SkillLevel.BEGINNER]: 'Beginner',
  [SkillLevel.INTERMEDIATE]: 'Intermediate',
  [SkillLevel.ADVANCED]: 'Advanced',
  [SkillLevel.EXPERT]: 'Expert',
}

const skillLevelPercent: Record<SkillLevel, number> = {
  [SkillLevel.BEGINNER]: 25,
  [SkillLevel.INTERMEDIATE]: 50,
  [SkillLevel.ADVANCED]: 75,
  [SkillLevel.EXPERT]: 95,
}

function SkillsPage() {
  const { data: skills, isLoading: skillsLoading } = useSkills()
  const { data: categories, isLoading: categoriesLoading } = useSkillCategories()
  
  // Skills dialog state
  const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  
  // Category dialog state
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<SkillCategory | null>(null)
  
  const [searchTerm, setSearchTerm] = useState('')

  const isLoading = skillsLoading || categoriesLoading

  const handleEditSkill = (skill: Skill) => {
    setEditingSkill(skill)
    setIsSkillDialogOpen(true)
  }

  const handleCloseSkillDialog = () => {
    setIsSkillDialogOpen(false)
    setEditingSkill(null)
  }

  const handleEditCategory = (category: SkillCategory) => {
    setEditingCategory(category)
    setIsCategoryDialogOpen(true)
  }

  const handleCloseCategoryDialog = () => {
    setIsCategoryDialogOpen(false)
    setEditingCategory(null)
  }

  // Group skills by category
  const skillsByCategory = skills?.reduce((acc, skill) => {
    const categoryId = skill.category?.id || 0
    if (!acc[categoryId]) {
      acc[categoryId] = { category: skill.category, skills: [] }
    }
    acc[categoryId].skills.push(skill)
    return acc
  }, {} as Record<number, { category: SkillCategory; skills: Skill[] }>) || {}

  const filteredCategories = Object.values(skillsByCategory).filter(group =>
    group.skills.some(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Skills</h1>
          <p className="text-muted-foreground">Manage your technical and soft skills</p>
        </div>
      </div>

      <Tabs defaultValue="skills" className="space-y-6">
        <TabsList>
          <TabsTrigger value="skills" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Skills
          </TabsTrigger>
          <TabsTrigger value="categories" className="gap-2">
            <FolderTree className="h-4 w-4" />
            Categories
          </TabsTrigger>
        </TabsList>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Card className="flex-1 max-w-md">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search skills..." 
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
            <Dialog open={isSkillDialogOpen} onOpenChange={setIsSkillDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2" onClick={() => setEditingSkill(null)}>
                  <Plus className="h-4 w-4" />Add Skill
                </Button>
              </DialogTrigger>
              <SkillDialog 
                skill={editingSkill} 
                categories={categories || []}
                onClose={handleCloseSkillDialog} 
              />
            </Dialog>
          </div>

          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-4 w-1/4 mt-1" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-2 w-full" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredCategories.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredCategories.map((group) => (
                <Card key={group.category?.id || 'uncategorized'}>
                  <CardHeader>
                    <CardTitle className="text-lg">{group.category?.name || 'Uncategorized'}</CardTitle>
                    <CardDescription>{group.skills.length} skills</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {group.skills
                      .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((skill) => (
                        <SkillItem key={skill.id} skill={skill} onEdit={handleEditSkill} />
                      ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  {searchTerm ? 'No skills match your search.' : 'No skills yet. Add your first one!'}
                </p>
                {!searchTerm && categories && categories.length === 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Tip: Create a category first in the "Categories" tab.
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-6">
          <div className="flex justify-end">
            <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2" onClick={() => setEditingCategory(null)}>
                  <Plus className="h-4 w-4" />Add Category
                </Button>
              </DialogTrigger>
              <CategoryDialog 
                category={editingCategory} 
                onClose={handleCloseCategoryDialog} 
              />
            </Dialog>
          </div>

          {categoriesLoading ? (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : categories && categories.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Skill Categories</CardTitle>
                <CardDescription>Organize your skills into categories</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Sort Order</TableHead>
                      <TableHead>Skills Count</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[70px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category) => (
                      <CategoryRow 
                        key={category.id} 
                        category={category}
                        skillsCount={skillsByCategory[category.id]?.skills.length || 0}
                        onEdit={handleEditCategory}
                      />
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <FolderTree className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No categories yet. Add your first one!</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Categories help organize your skills (e.g., "Frontend", "Backend", "DevOps")
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

// ==================== Skill Components ====================

function SkillItem({ skill, onEdit }: { skill: Skill; onEdit: (skill: Skill) => void }) {
  const deleteSkill = useDeleteSkill()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this skill?')) return
    setIsDeleting(true)
    try {
      await deleteSkill.mutateAsync(skill.id)
    } finally {
      setIsDeleting(false)
    }
  }

  const percent = skillLevelPercent[skill.level] || 50

  return (
    <div className={`space-y-2 ${!skill.isActive ? 'opacity-60' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">{skill.name}</span>
          <Badge variant="secondary" className="text-xs">{skillLevelLabels[skill.level]}</Badge>
          {!skill.isActive && <Badge variant="outline" className="text-xs">Inactive</Badge>}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{percent}%</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7" disabled={isDeleting}>
                {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(skill)}>
                <Pencil className="mr-2 h-4 w-4" />Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
                <Trash2 className="mr-2 h-4 w-4" />Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}

function SkillDialog({ skill, categories, onClose }: { skill: Skill | null; categories: SkillCategory[]; onClose: () => void }) {
  const createSkill = useCreateSkill()
  const updateSkill = useUpdateSkill()
  const isEditing = !!skill

  const [formData, setFormData] = useState<CreateSkillDto>({
    name: skill?.name || '',
    level: skill?.level || SkillLevel.INTERMEDIATE,
    image: skill?.image || '',
    order: skill?.order || 0,
    isActive: skill?.isActive ?? true,
    categoryId: skill?.category?.id || (categories[0]?.id || 0),
  })

  const isSubmitting = createSkill.isPending || updateSkill.isPending

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isEditing && skill) {
        await updateSkill.mutateAsync({ id: skill.id, data: formData })
      } else {
        await createSkill.mutateAsync(formData)
      }
      onClose()
    } catch (error) {
      console.error('Failed to save skill:', error)
    }
  }

  return (
    <DialogContent>
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Skill' : 'Add New Skill'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update skill details' : 'Add a new skill to your portfolio'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Skill Name *</Label>
            <Input 
              id="name" 
              placeholder="React, Python, etc." 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category *</Label>
            <Select 
              value={String(formData.categoryId)} 
              onValueChange={(v) => setFormData({ ...formData, categoryId: Number(v) })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {categories.length === 0 && (
              <p className="text-xs text-destructive">Please create a category first</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="level">Proficiency Level</Label>
            <Select 
              value={formData.level} 
              onValueChange={(v) => setFormData({ ...formData, level: v as SkillLevel })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(skillLevelLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Icon/Image URL</Label>
            <Input 
              id="image" 
              placeholder="https://example.com/icon.svg" 
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="order">Sort Order</Label>
            <Input 
              id="order" 
              type="number"
              placeholder="0" 
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
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
          <Button type="submit" disabled={isSubmitting || categories.length === 0}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              isEditing ? 'Update Skill' : 'Save Skill'
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}

// ==================== Category Components ====================

function CategoryRow({ category, skillsCount, onEdit }: { category: SkillCategory; skillsCount: number; onEdit: (cat: SkillCategory) => void }) {
  const deleteCategory = useDeleteSkillCategory()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (skillsCount > 0) {
      alert(`Cannot delete category with ${skillsCount} skills. Please move or delete the skills first.`)
      return
    }
    if (!confirm('Are you sure you want to delete this category?')) return
    setIsDeleting(true)
    try {
      await deleteCategory.mutateAsync(category.id)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <TableRow className={!category.isActive ? 'opacity-60' : ''}>
      <TableCell className="font-medium">{category.name}</TableCell>
      <TableCell>{category.sortOrder}</TableCell>
      <TableCell>
        <Badge variant="secondary">{skillsCount} skills</Badge>
      </TableCell>
      <TableCell>
        <Badge variant={category.isActive ? 'default' : 'outline'}>
          {category.isActive ? 'Active' : 'Inactive'}
        </Badge>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8" disabled={isDeleting}>
              {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(category)}>
              <Pencil className="mr-2 h-4 w-4" />Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-destructive" 
              onClick={handleDelete}
              disabled={skillsCount > 0}
            >
              <Trash2 className="mr-2 h-4 w-4" />Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}

function CategoryDialog({ category, onClose }: { category: SkillCategory | null; onClose: () => void }) {
  const createCategory = useCreateSkillCategory()
  const updateCategory = useUpdateSkillCategory()
  const isEditing = !!category

  const [formData, setFormData] = useState<CreateSkillCategoryDto>({
    name: category?.name || '',
    sortOrder: category?.sortOrder || 0,
    isActive: category?.isActive ?? true,
  })

  const isSubmitting = createCategory.isPending || updateCategory.isPending

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isEditing && category) {
        await updateCategory.mutateAsync({ id: category.id, data: formData })
      } else {
        await createCategory.mutateAsync(formData)
      }
      onClose()
    } catch (error) {
      console.error('Failed to save category:', error)
    }
  }

  return (
    <DialogContent>
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Category' : 'Add New Category'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update category details' : 'Create a new skill category to organize your skills'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="categoryName">Category Name *</Label>
            <Input 
              id="categoryName" 
              placeholder="Frontend, Backend, DevOps, etc." 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sortOrder">Sort Order</Label>
            <Input 
              id="sortOrder" 
              type="number"
              placeholder="0" 
              value={formData.sortOrder}
              onChange={(e) => setFormData({ ...formData, sortOrder: Number(e.target.value) })}
            />
            <p className="text-xs text-muted-foreground">
              Lower numbers appear first. Use this to control the display order.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Switch 
              id="categoryIsActive" 
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
            />
            <Label htmlFor="categoryIsActive">Active</Label>
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
              isEditing ? 'Update Category' : 'Create Category'
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
