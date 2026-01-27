import { createRoute, Link, useNavigate } from "@tanstack/react-router";
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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
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
  Trash2,
  Sparkles,
  FileText,
  Strikethrough,
  Minus,
  Loader2,
  Plus,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import {
  useBlog,
  useUpdateBlog,
  useDeleteBlog,
  useBlogTags,
  useCreateBlogTag,
} from "@/hooks/use-blogs";
import type { UpdateBlogDto } from "@/types";

export const blogEditRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "/blog/$postId",
  component: BlogEditPage,
});

// Simple markdown to HTML converter for preview
function parseMarkdown(markdown: string): string {
  let html = markdown
    // Escape HTML
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // Headers
    .replace(
      /^### (.*$)/gim,
      '<h3 class="text-lg font-semibold mt-6 mb-2">$1</h3>',
    )
    .replace(
      /^## (.*$)/gim,
      '<h2 class="text-xl font-semibold mt-8 mb-3">$1</h2>',
    )
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
    // Bold and Italic
    .replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/~~(.*?)~~/g, "<del>$1</del>")
    // Code blocks
    .replace(
      /```(\w*)\n([\s\S]*?)```/g,
      '<pre class="bg-muted p-4 rounded-lg my-4 overflow-x-auto text-sm"><code>$2</code></pre>',
    )
    // Inline code
    .replace(
      /`([^`]+)`/g,
      '<code class="bg-muted px-1.5 py-0.5 rounded text-sm">$1</code>',
    )
    // Blockquotes
    .replace(
      /^&gt; (.*$)/gim,
      '<blockquote class="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground">$1</blockquote>',
    )
    // Horizontal rule
    .replace(/^---$/gim, '<hr class="my-8 border-border" />')
    // Unordered lists
    .replace(/^\- (.*$)/gim, '<li class="ml-6 list-disc">$1</li>')
    // Ordered lists (basic)
    .replace(/^\d+\. (.*$)/gim, '<li class="ml-6 list-decimal">$1</li>')
    // Links
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-primary underline hover:no-underline">$1</a>',
    )
    // Line breaks
    .replace(/\n\n/g, '</p><p class="my-4">')
    .replace(/\n/g, "<br />");

  // Wrap in paragraph tags
  html = '<p class="my-4">' + html + "</p>";

  // Clean up empty paragraphs
  html = html.replace(/<p class="my-4"><\/p>/g, "");

  return html;
}

function BlogEditPage() {
  const { postId } = blogEditRoute.useParams();
  const navigate = useNavigate();
  const { data: blog, isLoading, error } = useBlog(parseInt(postId));
  const updateBlog = useUpdateBlog();
  const deleteBlog = useDeleteBlog();
  const createBlogTag = useCreateBlogTag();
  const { data: availableTags } = useBlogTags();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [coverImage, setCoverImage] = useState("");
  const [slug, setSlug] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [activeTab, setActiveTab] = useState("write");
  const [newTagName, setNewTagName] = useState("");
  const [isCreatingTag, setIsCreatingTag] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load blog data into form when it's fetched
  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
      setExcerpt(blog.excerpt);
      setCoverImage(blog.coverImage);
      setSlug(blog.slug);
      setIsFeatured(blog.isFeatured);
      setIsPublished(blog.isPublished);
      setSeoTitle(blog.seoTitle);
      setSeoDescription(blog.seoDescription);
      setSelectedTagIds(blog.tags?.map((t) => t.id) || []);
    }
  }, [blog]);

  const toggleTag = (tagId: number) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId],
    );
  };

  const handleCreateTag = async () => {
    if (!newTagName.trim()) return;

    // Check if tag already exists
    const existingTag = availableTags?.find(
      (tag) => tag.name.toLowerCase() === newTagName.trim().toLowerCase(),
    );
    if (existingTag) {
      // Just select it if it already exists
      if (!selectedTagIds.includes(existingTag.id)) {
        setSelectedTagIds((prev) => [...prev, existingTag.id]);
      }
      setNewTagName("");
      return;
    }

    setIsCreatingTag(true);
    try {
      const newTag = await createBlogTag.mutateAsync({
        name: newTagName.trim(),
      });
      // Auto-select the newly created tag
      if (newTag && newTag.id) {
        setSelectedTagIds((prev) => [...prev, newTag.id]);
      }
      setNewTagName("");
    } catch (error) {
      console.error("Failed to create tag:", error);
    } finally {
      setIsCreatingTag(false);
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCreateTag();
    }
  };

  const calculateReadTime = () => {
    const words = content.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  const handleSaveDraft = async () => {
    const blogData: UpdateBlogDto = {
      title,
      slug,
      content,
      excerpt: excerpt || content.substring(0, 160),
      coverImage,
      isPublished: false,
      isFeatured,
      readTime: calculateReadTime(),
      tagIds: selectedTagIds,
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt || content.substring(0, 160),
    };

    try {
      await updateBlog.mutateAsync({ id: parseInt(postId), data: blogData });
      navigate({ to: "/blog" });
    } catch (error) {
      console.error("Failed to save draft:", error);
    }
  };

  const handleUpdate = async () => {
    const blogData: UpdateBlogDto = {
      title,
      slug,
      content,
      excerpt: excerpt || content.substring(0, 160),
      coverImage,
      isPublished,
      isFeatured,
      readTime: calculateReadTime(),
      tagIds: selectedTagIds,
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt || content.substring(0, 160),
    };

    try {
      await updateBlog.mutateAsync({ id: parseInt(postId), data: blogData });
      navigate({ to: "/blog" });
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this blog post? This action cannot be undone.",
      )
    )
      return;

    try {
      await deleteBlog.mutateAsync(parseInt(postId));
      navigate({ to: "/blog" });
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const isSubmitting = updateBlog.isPending || deleteBlog.isPending;

  // Insert markdown syntax at cursor position
  const insertMarkdown = (
    before: string,
    after: string = "",
    placeholder: string = "",
  ) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end) || placeholder;
    const newText =
      content.substring(0, start) +
      before +
      selectedText +
      after +
      content.substring(end);

    setContent(newText);

    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length,
      );
    }, 0);
  };

  type ToolbarItem =
    | { type: "separator" }
    | {
        type?: undefined;
        icon: typeof Bold;
        action: () => void;
        title: string;
      };

  const toolbarActions: ToolbarItem[] = [
    {
      icon: Bold,
      action: () => insertMarkdown("**", "**", "bold text"),
      title: "Bold (Ctrl+B)",
    },
    {
      icon: Italic,
      action: () => insertMarkdown("*", "*", "italic text"),
      title: "Italic (Ctrl+I)",
    },
    {
      icon: Strikethrough,
      action: () => insertMarkdown("~~", "~~", "strikethrough"),
      title: "Strikethrough",
    },
    { type: "separator" },
    {
      icon: Heading1,
      action: () => insertMarkdown("\n# ", "\n", "Heading 1"),
      title: "Heading 1",
    },
    {
      icon: Heading2,
      action: () => insertMarkdown("\n## ", "\n", "Heading 2"),
      title: "Heading 2",
    },
    {
      icon: Heading3,
      action: () => insertMarkdown("\n### ", "\n", "Heading 3"),
      title: "Heading 3",
    },
    { type: "separator" },
    {
      icon: List,
      action: () => insertMarkdown("\n- ", "", "list item"),
      title: "Bullet List",
    },
    {
      icon: ListOrdered,
      action: () => insertMarkdown("\n1. ", "", "list item"),
      title: "Numbered List",
    },
    { type: "separator" },
    {
      icon: Quote,
      action: () => insertMarkdown("\n> ", "\n", "quote"),
      title: "Blockquote",
    },
    {
      icon: Code,
      action: () => insertMarkdown("`", "`", "code"),
      title: "Inline Code",
    },
    {
      icon: FileText,
      action: () => insertMarkdown("\n```\n", "\n```\n", "code block"),
      title: "Code Block",
    },
    {
      icon: Minus,
      action: () => insertMarkdown("\n---\n", "", ""),
      title: "Horizontal Rule",
    },
    {
      icon: LinkIcon,
      action: () => insertMarkdown("[", "](url)", "link text"),
      title: "Link",
    },
    {
      icon: ImageIcon,
      action: () => insertMarkdown("![", "](image-url)", "alt text"),
      title: "Image",
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/blog">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Blog Post Not Found
            </h1>
            <p className="text-muted-foreground">
              The blog post you're looking for doesn't exist.
            </p>
          </div>
        </div>
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold tracking-tight">Edit Post</h1>
            <p className="text-muted-foreground">Post ID: {postId}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-destructive hover:text-destructive"
            onClick={handleDelete}
            disabled={isSubmitting}
          >
            {deleteBlog.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            Delete
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleSaveDraft}
            disabled={isSubmitting || !title || !slug || !content}
          >
            {isSubmitting && !deleteBlog.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Clock className="h-4 w-4" />
            )}
            Save Draft
          </Button>
          <Button
            className="gap-2"
            onClick={handleUpdate}
            disabled={isSubmitting || !title || !slug || !content}
          >
            {isSubmitting && !deleteBlog.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Globe className="h-4 w-4" />
            )}
            Update
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base">
                  Post Title
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-xl h-12 font-medium"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug" className="text-sm text-muted-foreground">
                  URL Slug
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">/blog/</span>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

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
                  <img
                    src={coverImage}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => setCoverImage("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                  <p className="text-sm font-medium">Upload cover image</p>
                  <Input
                    placeholder="Or paste image URL..."
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="max-w-sm mx-auto mt-4"
                  />
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
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
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
                      if (item.type === "separator") {
                        return (
                          <Separator
                            key={index}
                            orientation="vertical"
                            className="h-6 mx-1"
                          />
                        );
                      }
                      const Icon = item.icon;
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
                      );
                    })}
                  </div>

                  {/* Editor */}
                  <Textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[400px] resize-none font-mono text-sm"
                  />
                </TabsContent>

                <TabsContent value="preview" className="mt-0">
                  <div className="min-h-[400px] border rounded-lg p-6 bg-card overflow-auto">
                    {content ? (
                      <article className="prose prose-sm max-w-none dark:prose-invert">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: parseMarkdown(content),
                          }}
                        />
                      </article>
                    ) : (
                      <div className="flex items-center justify-center h-[350px] text-muted-foreground">
                        <div className="text-center">
                          <Eye className="h-12 w-12 mx-auto mb-3 opacity-50" />
                          <p>Nothing to preview yet</p>
                          <p className="text-sm">
                            Start writing to see the preview
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{content.length} characters</span>
                <span>
                  ~
                  {Math.max(
                    1,
                    Math.ceil(
                      content.split(/\s+/).filter(Boolean).length / 200,
                    ),
                  )}{" "}
                  min read
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Excerpt</CardTitle>
              <CardDescription>
                A short summary for post listings and SEO
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
              />
              <p className="text-xs text-muted-foreground mt-2">
                {excerpt.length}/160 characters
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Publish Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Published</Label>
                  <p className="text-xs text-muted-foreground">
                    Make post public
                  </p>
                </div>
                <Switch
                  checked={isPublished}
                  onCheckedChange={setIsPublished}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Featured Post</Label>
                  <p className="text-xs text-muted-foreground">
                    Show on homepage
                  </p>
                </div>
                <Switch checked={isFeatured} onCheckedChange={setIsFeatured} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Tags</CardTitle>
              <CardDescription>
                Select or create tags for your post
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {availableTags && availableTags.length > 0 ? (
                  availableTags.map((tag) => (
                    <Badge
                      key={tag.id}
                      variant={
                        selectedTagIds.includes(tag.id) ? "default" : "outline"
                      }
                      className="cursor-pointer transition-colors"
                      onClick={() => toggleTag(tag.id)}
                    >
                      {tag.name}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No tags available. Create one below.
                  </p>
                )}
              </div>
              <Separator />
              <div className="space-y-2">
                <Label className="text-sm">Create New Tag</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter tag name..."
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    disabled={isCreatingTag}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={handleCreateTag}
                    disabled={isCreatingTag || !newTagName.trim()}
                  >
                    {isCreatingTag ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Press Enter or click + to create
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Meta Title</Label>
                <Input
                  placeholder="SEO title (60 chars max)"
                  maxLength={60}
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  {seoTitle.length}/60 characters
                </p>
              </div>
              <div className="space-y-2">
                <Label>Meta Description</Label>
                <Textarea
                  placeholder="SEO description (160 chars max)"
                  rows={3}
                  maxLength={160}
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  {seoDescription.length}/160 characters
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2">
            <Button
              className="w-full gap-2"
              onClick={handleUpdate}
              disabled={isSubmitting || !title || !slug || !content}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save Changes
            </Button>
            <Button
              variant="outline"
              className="w-full"
              asChild
              disabled={isSubmitting}
            >
              <Link to="/blog">Cancel</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
