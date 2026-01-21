import { createRoute, Outlet } from '@tanstack/react-router'
import { rootRoute } from './__root'

export const authLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: '_auth',
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/50">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <div className="relative z-10 w-full max-w-md px-4">
        <Outlet />
      </div>
    </div>
  )
}
