import { createRoute } from '@tanstack/react-router'
import { dashboardLayoutRoute } from '../_dashboard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { MoreHorizontal, Trash2, Mail, MailOpen, Clock, Search, Reply, Archive, Star, StarOff } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export const messagesRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/messages',
  component: MessagesPage,
})

const messages = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah@techcompany.com', subject: 'Senior Developer Position', message: "Hi John,\n\nI came across your portfolio and I'm impressed with your work. We're looking for a Senior Frontend Developer.\n\nWould you be interested in discussing?\n\nBest,\nSarah", date: '2024-03-15T10:30:00', read: false, starred: true, archived: false },
  { id: 2, name: 'Mike Chen', email: 'mike@startup.io', subject: 'Collaboration Opportunity', message: "Hey John!\n\nLove your portfolio! We're building something exciting in AI. Would love to chat about a collaboration.\n\nCheers,\nMike", date: '2024-03-14T15:45:00', read: false, starred: false, archived: false },
  { id: 3, name: 'Emily Davis', email: 'emily@designagency.com', subject: 'Freelance Project Inquiry', message: "Hello,\n\nWe have a client looking for a developer to build a custom dashboard. You seem like the perfect candidate.\n\nEmily", date: '2024-03-13T09:15:00', read: true, starred: true, archived: false },
  { id: 4, name: 'Alex Thompson', email: 'alex@university.edu', subject: 'Guest Speaker Invitation', message: "Dear John,\n\nWe'd love to have you speak to our students about modern web development.\n\nBest,\nDr. Thompson", date: '2024-03-12T14:00:00', read: true, starred: false, archived: false },
]

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24))
  if (days === 0) return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function MessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState<typeof messages[0] | null>(null)
  const unreadCount = messages.filter(m => !m.read && !m.archived).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-3xl font-bold tracking-tight">Messages</h1><p className="text-muted-foreground">Manage contact form submissions</p></div>
        <Badge variant="secondary" className="gap-1 w-fit"><Mail className="h-3 w-3" />{unreadCount} unread</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search messages..." className="pl-9" /></div></CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="inbox">
              <div className="px-4"><TabsList className="w-full"><TabsTrigger value="inbox" className="flex-1">Inbox ({messages.filter(m => !m.archived).length})</TabsTrigger><TabsTrigger value="starred" className="flex-1">Starred</TabsTrigger></TabsList></div>
              <TabsContent value="inbox" className="mt-0">
                <div className="divide-y max-h-[500px] overflow-auto">
                  {messages.filter(m => !m.archived).map((msg) => (
                    <div key={msg.id} onClick={() => setSelectedMessage(msg)} className={cn("p-4 cursor-pointer transition-colors hover:bg-accent/50", selectedMessage?.id === msg.id && "bg-accent", !msg.read && "bg-primary/5")}>
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10 shrink-0"><AvatarFallback className="bg-primary/10 text-primary text-sm">{msg.name.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className={cn("text-sm truncate", !msg.read && "font-semibold")}>{msg.name}</p>
                            <div className="flex items-center gap-1 shrink-0">{msg.starred && <Star className="h-3 w-3 fill-amber-400 text-amber-400" />}<span className="text-xs text-muted-foreground">{formatDate(msg.date)}</span></div>
                          </div>
                          <p className={cn("text-sm truncate", !msg.read ? "font-medium" : "text-muted-foreground")}>{msg.subject}</p>
                          <p className="text-xs text-muted-foreground truncate mt-0.5">{msg.message.split('\n')[0]}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="starred" className="mt-0">
                <div className="divide-y max-h-[500px] overflow-auto">
                  {messages.filter(m => m.starred && !m.archived).map((msg) => (
                    <div key={msg.id} onClick={() => setSelectedMessage(msg)} className={cn("p-4 cursor-pointer transition-colors hover:bg-accent/50", selectedMessage?.id === msg.id && "bg-accent")}>
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10 shrink-0"><AvatarFallback className="bg-primary/10 text-primary text-sm">{msg.name.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                        <div className="flex-1 min-w-0"><p className="text-sm truncate font-medium">{msg.name}</p><p className="text-sm text-muted-foreground truncate">{msg.subject}</p></div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          {selectedMessage ? (
            <>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1"><CardTitle className="text-lg">{selectedMessage.subject}</CardTitle><CardDescription><span className="font-medium text-foreground">{selectedMessage.name}</span> &lt;{selectedMessage.email}&gt;</CardDescription></div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">{selectedMessage.starred ? <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> : <StarOff className="h-4 w-4" />}</Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Archive className="h-4 w-4" /></Button>
                    <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem><MailOpen className="mr-2 h-4 w-4" />Mark as unread</DropdownMenuItem><DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2"><Clock className="h-3 w-3" />{new Date(selectedMessage.date).toLocaleString()}</div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="whitespace-pre-line text-sm leading-relaxed">{selectedMessage.message}</p>
                <Dialog><DialogTrigger asChild><Button className="gap-2"><Reply className="h-4 w-4" />Reply</Button></DialogTrigger><DialogContent className="max-w-2xl"><DialogHeader><DialogTitle>Reply to {selectedMessage.name}</DialogTitle><DialogDescription>Send a response</DialogDescription></DialogHeader><div className="grid gap-4 py-4"><Textarea placeholder="Write your reply..." rows={8} /></div><DialogFooter><Button variant="outline">Cancel</Button><Button>Send Reply</Button></DialogFooter></DialogContent></Dialog>
              </CardContent>
            </>
          ) : (
            <CardContent className="h-full flex items-center justify-center py-20"><div className="text-center space-y-2"><Mail className="h-12 w-12 mx-auto text-muted-foreground/50" /><p className="text-muted-foreground">Select a message to read</p></div></CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
