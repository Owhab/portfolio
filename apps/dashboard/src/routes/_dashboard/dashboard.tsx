import { createRoute } from '@tanstack/react-router'
import { dashboardLayoutRoute } from '../_dashboard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  FolderKanban, 
  Sparkles, 
  Briefcase, 
  MessageSquare, 
  TrendingUp,
  Eye,
  ArrowUpRight,
  Clock
} from 'lucide-react'

export const dashboardRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/dashboard',
  component: DashboardPage,
})

const stats = [
  { label: 'Total Projects', value: '12', icon: FolderKanban, change: '+2 this month', trend: 'up' },
  { label: 'Skills', value: '24', icon: Sparkles, change: '+5 this month', trend: 'up' },
  { label: 'Experience', value: '4 years', icon: Briefcase, change: '2 companies', trend: 'neutral' },
  { label: 'Messages', value: '8', icon: MessageSquare, change: '3 unread', trend: 'up' },
]

const recentProjects = [
  { name: 'E-commerce Platform', status: 'completed', tech: ['React', 'Node.js'], views: 234 },
  { name: 'Portfolio Dashboard', status: 'in-progress', tech: ['TypeScript', 'Tailwind'], views: 156 },
  { name: 'Mobile Banking App', status: 'completed', tech: ['React Native', 'Firebase'], views: 412 },
  { name: 'AI Chat Assistant', status: 'planning', tech: ['Python', 'OpenAI'], views: 89 },
]

const recentMessages = [
  { name: 'Sarah Johnson', email: 'sarah@company.com', message: 'Interested in hiring for a React project...', time: '2 hours ago', avatar: 'SJ' },
  { name: 'Mike Chen', email: 'mike@startup.io', message: 'Love your portfolio! Would like to discuss...', time: '5 hours ago', avatar: 'MC' },
  { name: 'Emily Davis', email: 'emily@agency.com', message: 'We have an exciting opportunity...', time: '1 day ago', avatar: 'ED' },
]

function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your portfolio.</p>
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
                {stat.trend === 'up' && (
                  <Badge variant="secondary" className="gap-1 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20">
                    <TrendingUp className="h-3 w-3" />
                    {stat.change}
                  </Badge>
                )}
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Recent Projects */}
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>Your latest portfolio projects</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="gap-1">
              View all <ArrowUpRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.name} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{project.name}</p>
                      <Badge 
                        variant={project.status === 'completed' ? 'default' : project.status === 'in-progress' ? 'secondary' : 'outline'}
                        className="text-xs"
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="text-xs text-muted-foreground">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    {project.views}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>Latest contact form submissions</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="gap-1">
              View all <ArrowUpRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMessages.map((msg, idx) => (
                <div key={idx} className="flex gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">{msg.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium text-sm truncate">{msg.name}</p>
                      <span className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
                        <Clock className="h-3 w-3" />
                        {msg.time}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{msg.email}</p>
                    <p className="text-sm text-muted-foreground truncate mt-1">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to manage your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button>Add New Project</Button>
            <Button variant="outline">Update Skills</Button>
            <Button variant="outline">Add Experience</Button>
            <Button variant="outline">View Portfolio</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
