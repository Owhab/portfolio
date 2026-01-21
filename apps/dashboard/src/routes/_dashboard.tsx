import { createRoute, Outlet, Link, useLocation } from '@tanstack/react-router'
import { rootRoute } from './__root'
import { 
  LayoutDashboard, 
  FolderKanban, 
  Sparkles, 
  Briefcase, 
  GraduationCap, 
  MessageSquare, 
  Settings,
  LogOut,
  Moon,
  Sun,
  Bell,
  Search,
  Menu,
  ChevronLeft
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export const dashboardLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: '_dashboard',
  component: DashboardLayout,
})

const navItems: Array<{ to: string; icon: typeof LayoutDashboard; label: string; badge?: number }> = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/projects', icon: FolderKanban, label: 'Projects' },
  { to: '/skills', icon: Sparkles, label: 'Skills' },
  { to: '/experience', icon: Briefcase, label: 'Experience' },
  { to: '/education', icon: GraduationCap, label: 'Education' },
  { to: '/messages', icon: MessageSquare, label: 'Messages', badge: 3 },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

function DashboardLayout() {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const NavContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={cn(
        "flex items-center h-16 px-4 border-b",
        collapsed && !mobile ? "justify-center" : "gap-3"
      )}>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shrink-0">
          <span className="text-lg font-bold text-primary-foreground">P</span>
        </div>
        {(!collapsed || mobile) && (
          <span className="font-semibold text-lg">Portfolio</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        <TooltipProvider delayDuration={0}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.to
            return (
              <Tooltip key={item.to}>
                <TooltipTrigger asChild>
                  <Link
                    to={item.to}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                      isActive 
                        ? "bg-primary text-primary-foreground shadow-sm" 
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      collapsed && !mobile && "justify-center px-2"
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {(!collapsed || mobile) && (
                      <>
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </>
                    )}
                  </Link>
                </TooltipTrigger>
                {collapsed && !mobile && (
                  <TooltipContent side="right" className="flex items-center gap-2">
                    {item.label}
                    {item.badge && (
                      <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </TooltipContent>
                )}
              </Tooltip>
            )
          })}
        </TooltipProvider>
      </nav>

      {/* User section */}
      <div className="p-3 border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className={cn(
                "w-full h-auto p-2",
                collapsed && !mobile ? "justify-center" : "justify-start"
              )}
            >
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              {(!collapsed || mobile) && (
                <div className="ml-2 text-left">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">john@example.com</p>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/login">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r bg-card transition-all duration-300 hidden lg:block",
        collapsed ? "w-[70px]" : "w-64"
      )}>
        <NavContent />
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-20 h-6 w-6 rounded-full border bg-background shadow-sm"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        </Button>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden fixed left-4 top-4 z-50">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <NavContent mobile />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className={cn(
        "transition-all duration-300",
        collapsed ? "lg:ml-[70px]" : "lg:ml-64"
      )}>
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-full items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-4 lg:gap-6 flex-1">
              <div className="hidden lg:block" />
              <div className="relative flex-1 max-w-md ml-12 lg:ml-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search..." 
                  className="pl-9 bg-muted/50 border-0 focus-visible:ring-1"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
              </Button>
              <Separator orientation="vertical" className="h-6 mx-2 hidden sm:block" />
              <div className="hidden sm:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <span className="hidden md:inline-block">John Doe</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/login">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
