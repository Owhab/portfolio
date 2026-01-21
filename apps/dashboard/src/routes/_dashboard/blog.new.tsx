import { createRoute, Link } from '@tanstack/react-router'
import { dashboardLayoutRoute } from '../_dashboard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Globe, 
  Clock, 
  Image as ImageIcon,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Code,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Upload,
  X,
  Sparkles,
  FileText,
  Strikethrough,
  Minus
} from 'lucide-react'
import { useState, useRef } from 'react'

export const blogNewRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/blog/new',
  component: BlogEditorPage,
})

const categories = [
  'Development',
  'Design',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Backend',
  'DevOps',
  'Career',
  'Tutorial',
]

const popularTags = [
  'React', 'TypeScript', 'JavaScript', 'CSS', 'Tailwind', 'Next.js', 
  'Node.js', 'API', 'Tutorial', 'Best Practices', 'Performance', 'Testing'
]

// Simple markdown to HTML converter for preview
function parseMarkdown(markdown: string): string {
  let html = markdown
    // Escape HTML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-6 mb-2">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mt-8 mb-3">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
    // Bold and Italic
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/~~(.*?)~~/g, '<del>$1</del>')
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-muted p-4 rounded-lg my-4 overflow-x-auto"><code>$2</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm">$1</code>')
    // Blockquotes
    .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground">$1</blockquote>')
    // Horizontal rule
    .replace(/^---$/gim, '<hr class="my-8 border-border" />')
    // Unordered lists
    .replace(/^\- (.*$)/gim, '<li class="ml-6 list-disc">$1</li>')
    // Ordered lists (basic)
    .replace(/^\d+\. (.*$)/gim, '<li class="ml-6 list-decimal">$1</li>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline hover:no-underline">$1</a>')
    // Line breaks
    .replace(/\n\n/g, '</p><p class="my-4">')
    .replace(/\n/g, '<br />')
  
  // Wrap in paragraph tags
  html = '<p class="my-4">' + html + '</p>'
  
  // Clean up empty paragraphs
  html = html.replace(/<p class="my-4"><\/p>/g, '')
  
  return html
}

function BlogEditorPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [category, setCategory] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [coverImage, setCoverImage] = useState('')
  const [slug, setSlug] = useState('')
  const [isFeatured, setIsFeatured] = useState(false)
  const [allowComments, setAllowComments] = useState(true)
  const [activeTab, setActiveTab] = useState('write')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
  }

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!slug) {
      setSlug(generateSlug(value))
    }
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  // Insert markdown syntax at cursor position
  const insertMarkdown = (before: string, after: string = '', placeholder: string = '') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end) || placeholder
    const newText = content.substring(0, start) + before + selectedText + after + content.substring(end)
    
    setContent(newText)
    
    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      )
    }, 0)
  }

  type ToolbarItem = 
    | { type: 'separator' }
    | { type?: undefined; icon: typeof Bold; action: () => void; title: string }

  const toolbarActions: ToolbarItem[] = [
    { icon: Bold, action: () => insertMarkdown('**', '**', 'bold text'), title: 'Bold (Ctrl+B)' },
    { icon: Italic, action: () => insertMarkdown('*', '*', 'italic text'), title: 'Italic (Ctrl+I)' },
    { icon: Strikethrough, action: () => insertMarkdown('~~', '~~', 'strikethrough'), title: 'Strikethrough' },
    { type: 'separator' },
    { icon: Heading1, action: () => insertMarkdown('\n# ', '\n', 'Heading 1'), title: 'Heading 1' },
    { icon: Heading2, action: () => insertMarkdown('\n## ', '\n', 'Heading 2'), title: 'Heading 2' },
    { icon: Heading3, action: () => insertMarkdown('\n### ', '\n', 'Heading 3'), title: 'Heading 3' },
    { type: 'separator' },
    { icon: List, action: () => insertMarkdown('\n- ', '', 'list item'), title: 'Bullet List' },
    { icon: ListOrdered, action: () => insertMarkdown('\n1. ', '', 'list item'), title: 'Numbered List' },
    { type: 'separator' },
    { icon: Quote, action: () => insertMarkdown('\n> ', '\n', 'quote'), title: 'Blockquote' },
    { icon: Code, action: () => insertMarkdown('`', '`', 'code'), title: 'Inline Code' },
    { icon: FileText, action: () => insertMarkdown('\n```\n', '\n```\n', 'code block'), title: 'Code Block' },
    { icon: Minus, action: () => insertMarkdown('\n---\n', '', ''), title: 'Horizontal Rule' },
    { icon: LinkIcon, action: () => insertMarkdown('[', '](url)', 'link text'), title: 'Link' },
    { icon: ImageIcon, action: () => insertMarkdown('![', '](image-url)', 'alt text'), title: 'Image' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/blog">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Create New Post</h1>
            <p className="text-muted-foreground">Write and publish a new blog article</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Clock className="h-4 w-4" />
            Save Draft
          </Button>
          <Button className="gap-2">
            <Globe className="h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base">Post Title</Label>
                  <Input 
                    id="title"
                    placeholder="Enter an engaging title..."
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="text-xl h-12 font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug" className="text-sm text-muted-foreground">URL Slug</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">/blog/</span>
                    <Input 
                      id="slug"
                      placeholder="post-url-slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cover Image */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Cover Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              {coverImage ? (
                <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                  <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => setCoverImage('')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                  <p className="text-sm font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG or WebP (max 2MB)</p>
                  <div className="mt-4">
                    <Input 
                      placeholder="Or paste image URL..."
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      className="max-w-sm mx-auto"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Content Editor with Preview */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Content</CardTitle>
                <Button variant="outline" size="sm" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  AI Assist
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="write" className="gap-2">
                    <FileText className="h-4 w-4" />
                    Write
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="gap-2">
                    <Eye className="h-4 w-4" />
                    Preview
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="write" className="space-y-4 mt-0">
                  {/* Toolbar */}
                  <div className="flex flex-wrap items-center gap-1 p-2 bg-muted/50 rounded-lg border">
                    {toolbarActions.map((item, index) => {
                      if (item.type === 'separator') {
                        return <Separator key={index} orientation="vertical" className="h-6 mx-1" />
                      }
                      const Icon = item.icon
                      return (
                        <Button 
                          key={index}
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={item.action}
                          title={item.title}
                          type="button"
                        >
                          <Icon className="h-4 w-4" />
                        </Button>
                      )
                    })}
                  </div>

                  {/* Editor */}
                  <Textarea 
                    ref={textareaRef}
                    placeholder="Start writing your post content here...

You can use Markdown formatting:
- **bold** for bold text
- *italic* for italic text
- # Heading 1, ## Heading 2, ### Heading 3
- [link text](url) for links
- `code` for inline code
- ```code block``` for code blocks
- > for blockquotes
- - for bullet lists
- 1. for numbered lists"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[400px] resize-none font-mono text-sm"
                  />
                </TabsContent>

                <TabsContent value="preview" className="mt-0">
                  <div className="min-h-[400px] border rounded-lg p-6 bg-card overflow-auto">
                    {content ? (
                      <article className="prose prose-sm max-w-none dark:prose-invert">
                        <div dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }} />
                      </article>
                    ) : (
                      <div className="flex items-center justify-center h-[350px] text-muted-foreground">
                        <div className="text-center">
                          <Eye className="h-12 w-12 mx-auto mb-3 opacity-50" />
                          <p>Nothing to preview yet</p>
                          <p className="text-sm">Start writing to see the preview</p>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{content.length} characters</span>
                <span>~{Math.max(1, Math.ceil(content.split(/\s+/).filter(Boolean).length / 200))} min read</span>
              </div>
            </CardContent>
          </Card>

          {/* Excerpt */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Excerpt</CardTitle>
              <CardDescription>A short summary that appears in post listings and SEO</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Write a compelling excerpt (150-160 characters recommended)..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
              />
              <p className="text-xs text-muted-foreground mt-2">{excerpt.length}/160 characters</p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Publish Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue="draft">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Publish Date</Label>
                <Input type="datetime-local" />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Featured Post</Label>
                  <p className="text-xs text-muted-foreground">Show on homepage</p>
                </div>
                <Switch checked={isFeatured} onCheckedChange={setIsFeatured} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow Comments</Label>
                  <p className="text-xs text-muted-foreground">Enable discussion</p>
                </div>
                <Switch checked={allowComments} onCheckedChange={setAllowComments} />
              </div>
            </CardContent>
          </Card>

          {/* Category */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Category</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Tags</CardTitle>
              <CardDescription>Select relevant tags for your post</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Badge 
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer transition-colors"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <Input placeholder="Add custom tag..." className="mt-2" />
            </CardContent>
          </Card>

          {/* SEO */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Meta Title</Label>
                <Input placeholder="SEO title (60 chars max)" maxLength={60} />
              </div>
              <div className="space-y-2">
                <Label>Meta Description</Label>
                <Textarea placeholder="SEO description (160 chars max)" rows={3} maxLength={160} />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <Button className="w-full gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/blog">Cancel</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
