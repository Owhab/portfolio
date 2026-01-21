import { createRoute } from '@tanstack/react-router'
import { dashboardLayoutRoute } from '../_dashboard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User, Bell, Shield, Palette, Globe, Upload, Github, Linkedin, Twitter } from 'lucide-react'

export const settingsRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/settings',
  component: SettingsPage,
})

function SettingsPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold tracking-tight">Settings</h1><p className="text-muted-foreground">Manage your account and portfolio settings</p></div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="profile" className="gap-2"><User className="h-4 w-4 hidden sm:inline" />Profile</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2"><Bell className="h-4 w-4 hidden sm:inline" />Alerts</TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2"><Palette className="h-4 w-4 hidden sm:inline" />Theme</TabsTrigger>
          <TabsTrigger value="security" className="gap-2"><Shield className="h-4 w-4 hidden sm:inline" />Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Profile Information</CardTitle><CardDescription>Update your personal details</CardDescription></CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20"><AvatarImage src="https://github.com/shadcn.png" /><AvatarFallback className="text-2xl">JD</AvatarFallback></Avatar>
                <div className="space-y-2"><Button variant="outline" className="gap-2"><Upload className="h-4 w-4" />Change Photo</Button><p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p></div>
              </div>
              <Separator />
              <div className="grid gap-4 sm:grid-cols-2"><div className="grid gap-2"><Label htmlFor="firstName">First Name</Label><Input id="firstName" defaultValue="John" /></div><div className="grid gap-2"><Label htmlFor="lastName">Last Name</Label><Input id="lastName" defaultValue="Doe" /></div></div>
              <div className="grid gap-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" defaultValue="john@example.com" /></div>
              <div className="grid gap-2"><Label htmlFor="title">Professional Title</Label><Input id="title" defaultValue="Senior Frontend Developer" /></div>
              <div className="grid gap-2"><Label htmlFor="bio">Bio</Label><Textarea id="bio" rows={4} defaultValue="Passionate frontend developer with 4+ years of experience building modern web applications." /></div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Globe className="h-5 w-5" />Social Links</CardTitle><CardDescription>Connect your social profiles</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2"><Label htmlFor="github" className="flex items-center gap-2"><Github className="h-4 w-4" />GitHub</Label><Input id="github" defaultValue="https://github.com/johndoe" /></div>
              <div className="grid gap-2"><Label htmlFor="linkedin" className="flex items-center gap-2"><Linkedin className="h-4 w-4" />LinkedIn</Label><Input id="linkedin" defaultValue="https://linkedin.com/in/johndoe" /></div>
              <div className="grid gap-2"><Label htmlFor="twitter" className="flex items-center gap-2"><Twitter className="h-4 w-4" />Twitter</Label><Input id="twitter" defaultValue="https://twitter.com/johndoe" /></div>
              <Button>Save Links</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Email Notifications</CardTitle><CardDescription>Configure what emails you receive</CardDescription></CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between"><div className="space-y-0.5"><Label>New Messages</Label><p className="text-sm text-muted-foreground">Get notified when someone contacts you</p></div><Switch defaultChecked /></div>
              <Separator />
              <div className="flex items-center justify-between"><div className="space-y-0.5"><Label>Weekly Summary</Label><p className="text-sm text-muted-foreground">Get weekly portfolio stats</p></div><Switch defaultChecked /></div>
              <Separator />
              <div className="flex items-center justify-between"><div className="space-y-0.5"><Label>Marketing</Label><p className="text-sm text-muted-foreground">Receive tips and updates</p></div><Switch /></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Theme</CardTitle><CardDescription>Customize dashboard appearance</CardDescription></CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="relative"><input type="radio" name="theme" id="light" className="peer sr-only" defaultChecked /><label htmlFor="light" className="block p-4 border rounded-lg cursor-pointer peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary/20"><div className="h-20 rounded bg-white border mb-2" /><p className="font-medium text-sm">Light</p></label></div>
                <div className="relative"><input type="radio" name="theme" id="dark" className="peer sr-only" /><label htmlFor="dark" className="block p-4 border rounded-lg cursor-pointer peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary/20"><div className="h-20 rounded bg-zinc-900 border mb-2" /><p className="font-medium text-sm">Dark</p></label></div>
                <div className="relative"><input type="radio" name="theme" id="system" className="peer sr-only" /><label htmlFor="system" className="block p-4 border rounded-lg cursor-pointer peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary/20"><div className="h-20 rounded bg-gradient-to-r from-white to-zinc-900 border mb-2" /><p className="font-medium text-sm">System</p></label></div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Change Password</CardTitle><CardDescription>Update your account password</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2"><Label htmlFor="currentPassword">Current Password</Label><Input id="currentPassword" type="password" /></div>
              <div className="grid gap-2"><Label htmlFor="newPassword">New Password</Label><Input id="newPassword" type="password" /></div>
              <div className="grid gap-2"><Label htmlFor="confirmPassword">Confirm Password</Label><Input id="confirmPassword" type="password" /></div>
              <Button>Update Password</Button>
            </CardContent>
          </Card>
          <Card className="border-destructive/50">
            <CardHeader><CardTitle className="text-destructive">Danger Zone</CardTitle><CardDescription>Irreversible actions</CardDescription></CardHeader>
            <CardContent><div className="flex items-center justify-between"><div className="space-y-0.5"><Label>Delete Account</Label><p className="text-sm text-muted-foreground">Permanently delete your account</p></div><Button variant="destructive">Delete Account</Button></div></CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
