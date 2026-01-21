import { createRoute, Link } from '@tanstack/react-router'
import { dashboardLayoutRoute } from '../_dashboard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Plus, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Eye, 
  Search, 
  FileText,
  Clock,
  Calendar,
  MessageCircle,
  Heart,
  TrendingUp,
  Globe,
  EyeOff,
  Archive,
  Copy
} from 'lucide-react'

export const blogRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/blog',
  component: BlogPage,
})

const blogPosts = [
  {
    id: 1,
    title: 'Building Scalable React Applications with TypeScript',
    slug: 'building-scalable-react-applications-typescript',
    excerpt: 'Learn how to structure your React applications for scalability using TypeScript, best practices, and modern patterns.',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
    status: 'published',
    category: 'Development',
    tags: ['React', 'TypeScript', 'Architecture'],
    author: { name: 'John Doe', avatar: 'https://github.com/shadcn.png' },
    publishedAt: '2024-03-10',
    readTime: '8 min read',
    views: 2453,
    likes: 142,
    comments: 23,
  },
  {
    id: 2,
    title: 'The Complete Guide to CSS Grid Layout',
    slug: 'complete-guide-css-grid-layout',
    excerpt: 'Master CSS Grid with this comprehensive guide covering everything from basics to advanced techniques.',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop',
    status: 'published',
    category: 'CSS',
    tags: ['CSS', 'Grid', 'Layout'],
    author: { name: 'John Doe', avatar: 'https://github.com/shadcn.png' },
    publishedAt: '2024-03-05',
    readTime: '12 min read',
    views: 1876,
    likes: 98,
    comments: 15,
  },
  {
    id: 3,
    title: 'Understanding Server Components in Next.js 14',
    slug: 'understanding-server-components-nextjs-14',
    excerpt: 'Deep dive into React Server Components and how they work in Next.js 14 for better performance.',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop',
    status: 'draft',
    category: 'Next.js',
    tags: ['Next.js', 'React', 'Server Components'],
    author: { name: 'John Doe', avatar: 'https://github.com/shadcn.png' },
    publishedAt: null,
    readTime: '10 min read',
    views: 0,
    likes: 0,
    comments: 0,
  },
  {
    id: 4,
    title: 'Mastering Tailwind CSS: Tips and Tricks',
    slug: 'mastering-tailwind-css-tips-tricks',
    excerpt: 'Discover advanced Tailwind CSS techniques to speed up your development workflow.',
    coverImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=200&fit=crop',
    status: 'published',
    category: 'CSS',
    tags: ['Tailwind', 'CSS', 'Productivity'],
    author: { name: 'John Doe', avatar: 'https://github.com/shadcn.png' },
    publishedAt: '2024-02-28',
    readTime: '6 min read',
    views: 3241,
    likes: 187,
    comments: 31,
  },
  {
    id: 5,
    title: 'State Management in 2024: Zustand vs Redux',
    slug: 'state-management-2024-zustand-vs-redux',
    excerpt: 'Comparing modern state management solutions for React applications.',
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=200&fit=crop',
    status: 'scheduled',
    category: 'Development',
    tags: ['React', 'State Management', 'Zustand'],
    author: { name: 'John Doe', avatar: 'https://github.com/shadcn.png' },
    publishedAt: '2024-03-20',
    readTime: '9 min read',
    views: 0,
    likes: 0,
    comments: 0,
  },
  {
    id: 6,
    title: 'Building REST APIs with Node.js and Express',
    slug: 'building-rest-apis-nodejs-express',
    excerpt: 'A practical guide to creating robust REST APIs using Node.js and Express.',
    coverImage: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=200&fit=crop',
    status: 'archived',
    category: 'Backend',
    tags: ['Node.js', 'Express', 'API'],
    author: { name: 'John Doe', avatar: 'https://github.com/shadcn.png' },
    publishedAt: '2023-12-15',
    readTime: '15 min read',
    views: 4521,
    likes: 234,
    comments: 45,
  },
]

const stats = [
  { label: 'Total Posts', value: '24', icon: FileText, change: '+3 this month' },
  { label: 'Total Views', value: '12.4K', icon: Eye, change: '+18% vs last month' },
  { label: 'Total Likes', value: '892', icon: Heart, change: '+24 this week' },
  { label: 'Comments', value: '156', icon: MessageCircle, change: '12 pending' },
]

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'outline' | 'destructive'; icon: typeof Globe }> = {
  published: { label: 'Published', variant: 'default', icon: Globe },
  draft: { label: 'Draft', variant: 'secondary', icon: EyeOff },
  scheduled: { label: 'Scheduled', variant: 'outline', icon: Clock },
  archived: { label: 'Archived', variant: 'destructive', icon: Archive },
}

function BlogPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted-foreground">Manage your blog posts and articles</p>
        </div>
        <Button className="gap-2" asChild>
          <Link to="/blog/new">
            <Plus className="h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <Badge variant="secondary" className="gap-1 text-xs bg-emerald-500/10 text-emerald-600">
                  <TrendingUp className="h-3 w-3" />
                  {stat.change}
                </Badge>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <Tabs defaultValue="all" className="w-full sm:w-auto">
              <TabsList>
                <TabsTrigger value="all">All Posts</TabsTrigger>
                <TabsTrigger value="published">Published</TabsTrigger>
                <TabsTrigger value="draft">Drafts</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search posts..." className="pl-9" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
          <CardDescription>A list of all your blog posts and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[400px]">Post</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-center">Views</TableHead>
                <TableHead className="text-center">Engagement</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogPosts.map((post) => {
                const status = statusConfig[post.status]
                return (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <img 
                          src={post.coverImage} 
                          alt={post.title}
                          className="h-12 w-20 rounded-md object-cover hidden sm:block"
                        />
                        <div className="space-y-1">
                          <p className="font-medium line-clamp-1">{post.title}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Not published'}
                            </span>
                            <span>·</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={status.variant} className="gap-1">
                        <status.icon className="h-3 w-3" />
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{post.category}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-sm">{post.views.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          {post.comments}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to="/blog/$postId" params={{ postId: post.id.toString() }}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Posts Grid (Alternative View) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Featured Posts</h2>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.filter(p => p.status === 'published').slice(0, 3).map((post) => (
            <Card key={post.id} className="overflow-hidden group">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={post.coverImage} 
                  alt={post.title}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/90">
                    {post.category}
                  </Badge>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{post.author.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {post.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {post.likes}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
