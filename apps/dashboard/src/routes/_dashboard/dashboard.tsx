import { createRoute, Link } from "@tanstack/react-router";
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  FolderKanban,
  Sparkles,
  Briefcase,
  GraduationCap,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { useProjects } from "@/hooks/use-projects";
import { useSkills } from "@/hooks/use-skills";
import { useExperiences } from "@/hooks/use-experiences";
import { useEducations } from "@/hooks/use-educations";

export const dashboardRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "/dashboard",
  component: DashboardPage,
});

function DashboardPage() {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: skills, isLoading: skillsLoading } = useSkills();
  const { data: experiences, isLoading: experiencesLoading } = useExperiences();
  const { data: educations, isLoading: educationsLoading } = useEducations();

  const isLoading =
    projectsLoading || skillsLoading || experiencesLoading || educationsLoading;

  const stats = [
    {
      label: "Total Projects",
      value: projects?.length || 0,
      icon: FolderKanban,
      loading: projectsLoading,
      href: "/projects",
    },
    {
      label: "Skills",
      value: skills?.length || 0,
      icon: Sparkles,
      loading: skillsLoading,
      href: "/skills",
    },
    {
      label: "Experience",
      value: experiences?.length || 0,
      icon: Briefcase,
      loading: experiencesLoading,
      href: "/experience",
    },
    {
      label: "Education",
      value: educations?.length || 0,
      icon: GraduationCap,
      loading: educationsLoading,
      href: "/education",
    },
  ];

  const recentProjects = projects?.slice(0, 4) || [];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <Link to={stat.href}>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="mt-4">
                {stat.loading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-2xl font-bold">{stat.value}</p>
                )}
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Projects */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>Your latest portfolio projects</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="gap-1" asChild>
              <Link to="/projects">
                View all <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {projectsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-6 w-16" />
                  </div>
                ))}
              </div>
            ) : recentProjects.length > 0 ? (
              <div className="space-y-4">
                {recentProjects.map((project) => {
                  const technologies =
                    project.techStack
                      ?.split(",")
                      .map((t) => t.trim())
                      .filter(Boolean)
                      .slice(0, 3) || [];
                  return (
                    <div
                      key={project.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{project.title}</p>
                          {project.isFeatured && (
                            <Badge variant="default" className="text-xs">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {technologies.map((t) => (
                            <span
                              key={t}
                              className="text-xs text-muted-foreground"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Badge
                        variant={project.isActive ? "secondary" : "outline"}
                      >
                        {project.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <FolderKanban className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No projects yet</p>
                <Button className="mt-4" asChild>
                  <Link to="/projects">Add your first project</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Experience */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Work Experience</CardTitle>
              <CardDescription>Your professional journey</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="gap-1" asChild>
              <Link to="/experience">
                View all <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {experiencesLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-6 w-16" />
                  </div>
                ))}
              </div>
            ) : experiences && experiences.length > 0 ? (
              <div className="space-y-4">
                {experiences.slice(0, 4).map((exp) => (
                  <div
                    key={exp.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{exp.title}</p>
                        {exp.isCurrent && (
                          <Badge className="bg-emerald-500/10 text-emerald-600 text-xs">
                            Current
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {exp.company}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No experience added</p>
                <Button className="mt-4" asChild>
                  <Link to="/experience">Add experience</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to manage your portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/projects">Add New Project</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/skills">Update Skills</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/experience">Add Experience</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/settings">Site Settings</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
