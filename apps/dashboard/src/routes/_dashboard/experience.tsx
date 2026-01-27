import { createRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { dashboardLayoutRoute } from "../_dashboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Building2,
  MapPin,
  Calendar,
  Loader2,
  Briefcase,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useExperiences,
  useCreateExperience,
  useUpdateExperience,
  useDeleteExperience,
} from "@/hooks/use-experiences";
import type { Experience, CreateExperienceDto } from "@/types";

export const experienceRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "/experience",
  component: ExperiencePage,
});

function formatDate(dateStr: string | null | undefined) {
  if (!dateStr) return "Present";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function ExperiencePage() {
  const { data: experiences, isLoading, error } = useExperiences();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(
    null,
  );

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingExperience(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
          <p className="text-muted-foreground">Manage your work experience</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="gap-2"
              onClick={() => setEditingExperience(null)}
            >
              <Plus className="h-4 w-4" />
              Add Experience
            </Button>
          </DialogTrigger>
          <ExperienceDialog
            experience={editingExperience}
            onClose={handleCloseDialog}
          />
        </Dialog>
      </div>

      {isLoading ? (
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block" />
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="relative md:ml-16">
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
        </div>
      ) : error ? (
        <Card>
          <CardContent className="p-6">
            <p className="text-destructive">
              Failed to load experiences. Please try again.
            </p>
          </CardContent>
        </Card>
      ) : experiences && experiences.length > 0 ? (
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block" />
          <div className="space-y-6">
            {experiences.map((exp, idx) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                index={idx}
                onEdit={handleEdit}
              />
            ))}
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              No work experience yet. Add your first position!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function ExperienceCard({
  experience,
  index,
  onEdit,
}: {
  experience: Experience;
  index: number;
  onEdit: (exp: Experience) => void;
}) {
  const deleteExperience = useDeleteExperience();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this experience?")) return;
    setIsDeleting(true);
    try {
      await deleteExperience.mutateAsync(experience.id);
    } finally {
      setIsDeleting(false);
    }
  };

  const technologies =
    experience.techStack
      ?.split(",")
      .map((t) => t.trim())
      .filter(Boolean) || [];

  return (
    <Card
      className={`relative md:ml-16 ${!experience.isActive ? "opacity-60" : ""}`}
    >
      <div className="absolute -left-[4.5rem] top-6 hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
        {index + 1}
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <CardTitle className="text-xl">{experience.title}</CardTitle>
              {experience.isCurrent && (
                <Badge className="bg-emerald-500/10 text-emerald-600">
                  Current
                </Badge>
              )}
              {!experience.isActive && (
                <Badge variant="secondary">Inactive</Badge>
              )}
            </div>
            <CardDescription className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                {experience.company}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {experience.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(experience.startDate)} -{" "}
                {formatDate(experience.endDate)}
              </span>
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <MoreHorizontal className="h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(experience)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={handleDelete}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {experience.description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {experience.description}
          </p>
        )}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ExperienceDialog({
  experience,
  onClose,
}: {
  experience: Experience | null;
  onClose: () => void;
}) {
  const createExperience = useCreateExperience();
  const updateExperience = useUpdateExperience();
  const isEditing = !!experience;

  const [formData, setFormData] = useState<CreateExperienceDto>({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
    techStack: "",
    sortOrder: 0,
    isActive: true,
  });

  // Update form data when experience changes (for editing)
  useEffect(() => {
    if (experience) {
      setFormData({
        title: experience.title || "",
        company: experience.company || "",
        location: experience.location || "",
        startDate: experience.startDate?.split("T")[0] || "",
        endDate: experience.endDate?.split("T")[0] || "",
        isCurrent: experience.isCurrent || false,
        description: experience.description || "",
        techStack: experience.techStack || "",
        sortOrder: experience.sortOrder || 0,
        isActive: experience.isActive ?? true,
      });
    } else {
      setFormData({
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        description: "",
        techStack: "",
        sortOrder: 0,
        isActive: true,
      });
    }
  }, [experience]);

  const isSubmitting = createExperience.isPending || updateExperience.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && experience) {
        await updateExperience.mutateAsync({
          id: experience.id,
          data: formData,
        });
      } else {
        await createExperience.mutateAsync(formData);
      }
      onClose();
    } catch (error) {
      console.error("Failed to save experience:", error);
    }
  };

  return (
    <DialogContent className="max-w-2xl">
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Experience" : "Add Work Experience"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update your work experience"
              : "Add a new position to your experience timeline"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                placeholder="Senior Developer"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              placeholder="City, Country"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate || ""}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value || null })
                }
                disabled={formData.isCurrent}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="isCurrent"
              checked={formData.isCurrent}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  isCurrent: checked,
                  endDate: checked ? null : formData.endDate,
                })
              }
            />
            <Label htmlFor="isCurrent">I currently work here</Label>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your responsibilities and achievements..."
              rows={4}
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="techStack">Technologies (comma-separated)</Label>
            <Input
              id="techStack"
              placeholder="React, TypeScript, Node.js"
              value={formData.techStack}
              onChange={(e) =>
                setFormData({ ...formData, techStack: e.target.value })
              }
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isActive: checked })
              }
            />
            <Label htmlFor="isActive">Show on portfolio</Label>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : isEditing ? (
              "Update Experience"
            ) : (
              "Save Experience"
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
