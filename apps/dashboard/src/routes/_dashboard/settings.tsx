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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Globe, Palette, Shield, Loader2, Settings2 } from "lucide-react";
import {
  useSettings,
  useUpdateSettings,
  useCreateSettings,
} from "@/hooks/use-settings";
import { Language, type UpdateSettingsDto } from "@/types";

export const settingsRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "/settings",
  component: SettingsPage,
});

function SettingsPage() {
  const { data: settings, isLoading, error } = useSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your site settings</p>
      </div>

      <Tabs defaultValue="site" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="site" className="gap-2">
            <Globe className="h-4 w-4 hidden sm:inline" />
            Site
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4 hidden sm:inline" />
            Theme
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4 hidden sm:inline" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="site" className="space-y-6">
          {isLoading ? (
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </CardContent>
            </Card>
          ) : error ? (
            <Card>
              <CardContent className="p-6">
                <p className="text-destructive">
                  Failed to load settings. Please try again.
                </p>
              </CardContent>
            </Card>
          ) : (
            <SiteSettingsForm settings={settings} />
          )}
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>Customize dashboard appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="relative">
                  <input
                    type="radio"
                    name="theme"
                    id="light"
                    className="peer sr-only"
                    defaultChecked
                  />
                  <label
                    htmlFor="light"
                    className="block p-4 border rounded-lg cursor-pointer peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary/20"
                  >
                    <div className="h-20 rounded bg-white border mb-2" />
                    <p className="font-medium text-sm">Light</p>
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="radio"
                    name="theme"
                    id="dark"
                    className="peer sr-only"
                  />
                  <label
                    htmlFor="dark"
                    className="block p-4 border rounded-lg cursor-pointer peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary/20"
                  >
                    <div className="h-20 rounded bg-zinc-900 border mb-2" />
                    <p className="font-medium text-sm">Dark</p>
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="radio"
                    name="theme"
                    id="system"
                    className="peer sr-only"
                  />
                  <label
                    htmlFor="system"
                    className="block p-4 border rounded-lg cursor-pointer peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary/20"
                  >
                    <div className="h-20 rounded bg-gradient-to-r from-white to-zinc-900 border mb-2" />
                    <p className="font-medium text-sm">System</p>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your account password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button>Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SiteSettingsForm({
  settings,
}: {
  settings: ReturnType<typeof useSettings>["data"];
}) {
  const updateSettings = useUpdateSettings();
  const createSettings = useCreateSettings();
  const isNew = !settings;

  const [formData, setFormData] = useState<UpdateSettingsDto>({
    siteName: settings?.siteName || "",
    siteShortName: settings?.siteShortName || "",
    siteDescription: settings?.siteDescription || "",
    siteUrl: settings?.siteUrl || "",
    siteLogo: settings?.siteLogo || "",
    favicon: settings?.favicon || "",
    themeColor: settings?.themeColor || "#000000",
    defaultLanguage: settings?.defaultLanguage || Language.ENGLISH,
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        siteName: settings.siteName,
        siteShortName: settings.siteShortName,
        siteDescription: settings.siteDescription,
        siteUrl: settings.siteUrl,
        siteLogo: settings.siteLogo,
        favicon: settings.favicon,
        themeColor: settings.themeColor,
        defaultLanguage: settings.defaultLanguage,
      });
    }
  }, [settings]);

  const isSubmitting = updateSettings.isPending || createSettings.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isNew) {
        await createSettings.mutateAsync(formData as any);
      } else {
        await updateSettings.mutateAsync(formData);
      }
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings2 className="h-5 w-5" />
            Site Settings
          </CardTitle>
          <CardDescription>
            Configure your portfolio site settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="siteName">Site Name *</Label>
              <Input
                id="siteName"
                placeholder="My Portfolio"
                value={formData.siteName}
                onChange={(e) =>
                  setFormData({ ...formData, siteName: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="siteShortName">Short Name *</Label>
              <Input
                id="siteShortName"
                placeholder="Portfolio"
                value={formData.siteShortName}
                onChange={(e) =>
                  setFormData({ ...formData, siteShortName: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="siteDescription">Site Description *</Label>
            <Textarea
              id="siteDescription"
              placeholder="A brief description of your portfolio site"
              rows={3}
              value={formData.siteDescription}
              onChange={(e) =>
                setFormData({ ...formData, siteDescription: e.target.value })
              }
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="siteUrl">Site URL *</Label>
            <Input
              id="siteUrl"
              type="url"
              placeholder="https://yoursite.com"
              value={formData.siteUrl}
              onChange={(e) =>
                setFormData({ ...formData, siteUrl: e.target.value })
              }
              required
            />
          </div>

          <Separator />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="siteLogo">Logo URL *</Label>
              <Input
                id="siteLogo"
                placeholder="https://yoursite.com/logo.png"
                value={formData.siteLogo}
                onChange={(e) =>
                  setFormData({ ...formData, siteLogo: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="favicon">Favicon URL *</Label>
              <Input
                id="favicon"
                placeholder="https://yoursite.com/favicon.ico"
                value={formData.favicon}
                onChange={(e) =>
                  setFormData({ ...formData, favicon: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="themeColor">Theme Color *</Label>
              <div className="flex gap-2">
                <Input
                  id="themeColor"
                  type="color"
                  className="w-12 h-10 p-1"
                  value={formData.themeColor}
                  onChange={(e) =>
                    setFormData({ ...formData, themeColor: e.target.value })
                  }
                />
                <Input
                  value={formData.themeColor}
                  onChange={(e) =>
                    setFormData({ ...formData, themeColor: e.target.value })
                  }
                  placeholder="#000000"
                  className="flex-1"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="defaultLanguage">Default Language *</Label>
              <Select
                value={formData.defaultLanguage}
                onValueChange={(v) =>
                  setFormData({ ...formData, defaultLanguage: v as Language })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Language.ENGLISH}>English</SelectItem>
                  <SelectItem value={Language.BANGLA}>Bangla</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Settings"
            )}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
